(function () {
    'use strict';
    var controllerId = 'RecordCtrl';
    angular.module('app').controller(controllerId, ['$scope',RecordCtrl]);
    function RecordCtrl($scope) {

            // Historical data
            $scope.history = [];

            // Default data (can be loaded from a database)
            $scope.records = [
                { policyNumber: '123456789', firstName: '', lastName: 'Sebastian', fullName: 'RS', vin: '12345', driverLicenseState: 'MD', driverLicenseNumber: 'RS12345', state: 'NY' },
                { policyNumber: '123456789', firstName: '', lastName: 'Dacha', fullName: 'YD', vin: '12345', driverLicenseState: 'MD', driverLicenseNumber: 'YD12345', state: 'NJ' },
                { policyNumber: '123456789', firstName: '', lastName: 'Mangalapally', fullName: 'BM', vin: '12345', driverLicenseState: 'MD', driverLicenseNumber: 'BM12345', state: 'NY' },
                { policyNumber: '123456789', firstName: '', lastName: 'Kuntu', fullName: 'CK', vin: '12345', driverLicenseState: 'MD', driverLicenseNumber: 'CK12345', state: 'NC' },
                { policyNumber: '123456789', firstName: '', lastName: 'Limati', fullName: 'AL', vin: '12345', driverLicenseState: 'MD', driverLicenseNumber: 'AL12345', state: 'MC' }
            ];

            ////// Total prices
            ////$scope.Totals = function () {
            ////    var priceTotal = 0;
            ////    var taxTotal = 0;

            ////    // Loop through main records and calculate aggregate prices and taxes if include is true
            ////    angular.forEach($scope.records, function (record) {
            ////        ////if (record.include) {
            ////        priceTotal += record.price;
            ////        taxTotal += record.tax;
            ////        ////}
            ////    });

            ////    // Return aggregate data
            ////    return { price: priceTotal, tax: taxTotal };
            ////};

            // Delete data
            $scope.Delete = function (index) {
                $scope.isshow = '-1';
                // Remove first / oldest element from history if it reaches maximum capacity of 10 records
                if ($scope.history.length === 10)
                    $scope.history.shift();
                // Add deleted record to historical records
                $scope.history.push($scope.records[index]);

                // Remove from main records (using index)
                $scope.records.splice(index, 1);
            };

            // Reset new data model
            $scope.Reset = function () {
                $scope.isshow = '-1';
                $scope.newState = '';
                $scope.newPrice = 0;
                $scope.newTax = 0;
            }
            $scope.Reset();

            // Add new data
            $scope.Add = function () {
                // Do nothing if no state is entered (blank)
                if (!$scope.newState)
                    return;

                // Add to main records
                $scope.records.push({
                    state: $scope.newState,
                    price: $scope.newPrice,
                    tax: $scope.newTax,
                    ////include: false
                });

                // See $Scope.Reset...
                $scope.Reset();
            }

            // Undo action (delete)
            $scope.Undo = function () {
                $scope.isshow = '-1';
                // Add last / most recent historical record to the main records
                $scope.records.push($scope.history[$scope.history.length - 1]);

                // Remove last / most recent historical record
                $scope.history.pop();
            }
            $scope.Edit = function (index) {
                $scope.isshow = index;
            }
        }
})();