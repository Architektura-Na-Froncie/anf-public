// @ts-check
/** @type {import('../src/pubsub')} */
/** @type {import('angular')} */
/* global angular */

angular.module('angularApp', [])
  .controller('SettingsController', ['$scope', function (/** @type ng.IScope */ $scope) {
    var vm = this;

    vm.settings = {
      minCostValue: 100,
      displayCosts: false,
      costSortOrder: undefined
    };

    vm.notifyChange = function () {
      window.PubSub.notify('settingsChange', angular.copy(vm.settings));
    }
  }]);
