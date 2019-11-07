//Web ap's firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC6YhVdGhfUxCyUHF0CTW1eMGz3O7Omh5w",
    authDomain: "trainscheduler-1dd78.firebaseapp.com",
    databaseURL: "https://trainscheduler-1dd78.firebaseio.com",
    projectId: "trainscheduler-1dd78",
    storageBucket: "trainscheduler-1dd78.appspot.com",
    messagingSenderId: "523491132928",
    appId: "1:523491132928:web:6ba8870752554c92e23ae5",
    measurementId: "G-NK855SRRFB"
  };

  //Initialize firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);

  const database = firebase.database();

$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    //Get input values 
    const trainName = $("#train-name-input").val().trim();
    const destination = $("#destination-input").val().trim();
    const firstTrainTime = $("#first-train-input").val().trim();
    const frequency = $("#frequency-input").val().trim();
    //console.log(trainName + " "+destination + " " + firstTrainTime +" " + frequency);
    
    //Create an object to hold these values 
    const newTrain = {
        trainName,
        destination,
        firstTrainTime,
        frequency
    };
    database.ref().push(newTrain);

    console.log("Train added to database successfully");
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
    const trainName = snapshot.val().trainName;
    const destination = snapshot.val().destination;
    const firstTrainTime = snapshot.val().firstTrainTime;
    const frequency = snapshot.val().frequency;

    console.log(trainName);



});