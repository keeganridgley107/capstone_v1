"use strict";
(function() {
    angular.module("app")
        .component('questions', {
            controller: questionCtrl,
            templateUrl: '/questions/question.template.html'
        });



    questionCtrl.$inject = ['$http'];

    function questionCtrl($http) {
        const vm = this;

        vm.counter = 1;
        vm.qID = 1;
        vm.totalQuest = 0;
        vm.userANS = [];
        //above used in multiple functions

        vm.$onInit = function() {
            vm.questionToggleFlag = true;
            vm.finalQuestionToggleFlag = false;
            //vm.smsFormToggleFlag = false;
            vm.beginToggle = false;





            if (localStorage.getItem('isWin') === null){

            }else{

              vm.questionToggleFlag = false;
              vm.beginToggle =true;

            }
            // check for localStorage if yes
            // user has already completed the mystery
            // redirect to secret_page

            $http.get('/questions')
                .then(function(response) {
                    vm.allQuestions = response.data;

                    vm.totalQuest = response.data.length;

                });

            $http.get('/final_question')
                .then(function(response) {
                    vm.finalQuestion = response.data;


                });

        }; //end of oninit function


        vm.questionToggle = function() {
            vm.counter = 1;
        };
        //this function keeps track of the answers the user gets right

        vm.questionSubmit =function(question){
          //debug submit log here


          let tempANS = vm.questionAnswer;
          vm.qID = question.id;
          let isWin = false;

          if (tempANS === question.answer1 || tempANS === question.answer2 || tempANS === question.answer3) {
            isWin = true;

            //this means the user has correct answer

            //insert awesome animation here!!1

            vm.userANS.push(tempANS);
            vm.questionAnswer = '';
            vm.counter++;
            if (vm.counter === (vm.totalQuest + 1)) {
              vm.finalQuestionToggleFlag = true;
            }
          }else{
            //failure msg goes here (modal or whatev)
            // alert("this is not a correct answer, plese try again");
            $('#myModal').modal({
              keyboard: true
            })
            vm.questionAnswer = '';

            //insert failure animation here!!

          }
          

        };
        //this function is used to submit all the main questions and compare user answer to determine if they are correct or not then it empties the form and responds to the user

        vm.finalSubmit = function(){

            let tempANS = vm.finalAnswer;
            let isWin = false;

            if (tempANS === vm.finalQuestion[0].answer1 || tempANS === vm.finalQuestion[0].answer2 || tempANS === vm.finalQuestion[0].answer3) {
              isWin = true;
              vm.userANS.push(tempANS);
              vm.finalAnswer = '';
              vm.finalQuestionToggleFlag = false;

              localStorage.setItem("isWin", "sec1");
              vm.section2InfoFlag =true;


              // api functionality goes here


              //todo: change to animated modal dropdown

            }else{
              $('#myModal2').modal({
                keyboard: true
              })
            }

        };


        vm.call = function(){
          $http.get('/call')
          .then($('#myModal3').modal({
            keyboard: true
          })
          )
        };
        //this function is used to submit the final user answer and determine if they have the right one(s) out of the three possible if  it is the function calls the handshakeToggle function

        //todo: PIVOT this using a working sms/email API

        //this function will fire a SMS to the number provided with a set msg payload if it is actually a series of numbers (check for chars other than 0-9 and handle kebab-case)


    } //end QuestionController

})();
