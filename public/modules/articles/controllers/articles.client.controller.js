'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

	//	var Articles = new $resource('articles/');
		$scope.create = function() {
			var article = new Articles({
				proposalName: this.proposalName,
				sponsorName: this.sponsorName,
				govLevel: this.govLevel,
				state: this.state,
				city: this.city,
				summary: this.summary,
				proposalLink: this.proposalLink,
				comments: []
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);
				$scope.comments = '';
				$scope.proposalName = '';
				$scope.sponsorName = '';
				$scope.govLevel = '';
				$scope.state = '';
				$scope.city = '';
				$scope.summary = '';
				$scope.proposalLink = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.btn_add = function(article) {
			$scope.comments.push(this.comment);
			$scope.comment = {};
		};
		
		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);