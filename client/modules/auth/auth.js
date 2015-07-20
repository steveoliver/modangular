/**
 * This authentication architecture was initially based on methods
 * used in LoopBackJS' AngularJS service generator. http://loopback.io/
 */
angular.module('app.auth', [])
  .config(function($httpProvider, $stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'auth/views/login.html',
      controller: 'LoginCtrl',
      anonymous: true
    });
    $stateProvider.state('logout', {
      url: '/logout',
      templateUrl: 'auth/views/logout.html',
      controller: 'LogoutCtrl'
    });

    $httpProvider.interceptors.push('AuthInterceptor');

  })
  .factory('User', function(AppAuth, $base64, $http) {

    var apiBase = 'https://api.example.com/';

    var login = function(credentials, callback) {
      var req = {
        method: 'POST',
        url: apiBase + 'users/authenticate',
        data: {username: credentials.username, password: credentials.password}
      };

      $http(req)
        .success(function(data, status, headers, config) {
          if (status == 200) {
            AppAuth.setUser(
              data.token
            );
            AppAuth.save();
            callback(null, data);

          } else {
            callback('Invalid login', null);
          }
        })
        .error(function(data, status, headers, config) {
          callback(data, null);
        });
    };

    var logout = function(callback) {
      var req = {
        method: 'DELETE',
        url: apiBase + '/users/logout',
        data: {token: AppAuth.token}
      };

      $http(req)
        .success(function(data, status, headers, config) {
          if (status == 200) {
            AppAuth.clearUser();
            AppAuth.save();
            callback(null, data);
          } else {
            AppAuth.clearUser();
            AppAuth.save();
            callback('Unable to delete token', null);
          }
        })
        .error(function(data, status, headers, config) {
          callback(data, null);
        });
    };

    var validate = function(callback) {
      var req = {
        method: 'GET',
        url: apiBase + '/users/validate',
        data: {token: AppAuth.token}
      };

      $http(req)
        .success(function(data, status, headers, config) {
          if (status == 200) {
            callback(null, true);
          } else {
            callback('Unable to validate token', null);
          }
        })
        .error(function(data, status, headers, config) {
          callback(data, null);
        });
    };

    return {
      login: login,
      logout: logout,
      validate: validate
    };

  })
  .factory('AppAuth', function() {

    function AppAuth() {
      this.token = load('userId');
      this.token = load('token');
      this.rememberMe = false;
    }

    AppAuth.prototype.save = function() {
      var storage = this.rememberMe ? localStorage : sessionStorage;
      save(storage, 'userId', this.userId);
      save(storage, 'token', this.token);
    };

    AppAuth.prototype.setUser = function(userId, token) {
      this.userId = userId;
      this.token = token;
    };

    AppAuth.prototype.clearUser = function() {
      this.userId = null;
      this.token = null;
    };

    return new AppAuth();

    function save(storage, name, value) {
      var key = '$AppAuth$' + name;
      if (value === null) {
        storage.removeItem(key);
      }
      else {
        storage.setItem(key, value);
      }
    }

    function load(name) {
      var key = '$AppAuth$' + name;
      var value = localStorage.getItem(key);
      if (!value) {
        value = sessionStorage.getItem(key);
      }
      return value;
    }
  })
  .run(function(AppAuth, User, $rootScope, $location, $state) {
    // Validate on the initial browser page load.
    if (AppAuth.token) {
      User.validate(function(err, valid) {
        if (valid !== true) {
          AppAuth.clearUser();
          AppAuth.save();
          $state.go('login');
        }
      });
    }

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
      if (!AppAuth.currentUserId && !toState.anonymous) {
        event.preventDefault();
        $state.go('login');
      }
    });
  })

  .factory('AuthInterceptor', function($q, AppAuth) {
    return {
      'request': function(config) {

        if (AppAuth.token) {
          config.url = config.url + '?token=' + AppAuth.token;
        }
        return config;
      }
    };
  })
  .controller('LoginCtrl', function(AppAuth, User, $state, $scope) {
    AppAuth.clearUser();
    $scope.main.anon = true;
    $scope.credentials = {username: '', password: ''};
    $scope.loginFailed = false;

    $scope.login = function(err, data) {
      $scope.loginResult = User.login($scope.credentials,
        function() {
          // Successful login, stend to appropriate state
          $state.go('dashboard');
        },
        function(res) {
          // TODO: Show error
          $scope.loginFailed = true;
        });
    };
  })
  .controller('LogoutCtrl', function(AppAuth, sio, $state, User, $scope) {
    $scope.loginResult = User.logout(function() {
      $state.go('login');
    }, function(res) {
      $state.go('login');
    });
  });
