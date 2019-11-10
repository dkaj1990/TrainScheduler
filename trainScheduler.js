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
    let firstTrainTime = snapshot.val().firstTrainTime;
    const frequency = snapshot.val().frequency;

    console.log(trainName);
    firstTrainTime = firstTrainTime.replace("am", "");
    console.log(firstTrainTime);
    const firstTimeConverted = moment(firstTrainTime, "HH:mm");
    console.log("First time converted "+ firstTimeConverted);

    const currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    const diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Diff in time: "+ diffTime);

    const tRemainder = diffTime % frequency;
    console.log(tRemainder);
    
    let minutesAway = frequency - tRemainder;
    console.log("minutes away "+ minutesAway);    
    
    let nextArrival = moment().add(minutesAway, "minutes") ;
    console.log(moment(nextArrival).format("hh:mm"));
    

    //create ne row
    const newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextArrival).format("hh:mm")),
        $("<td>").text(minutesAway),
    );

    $("#train-table > tbody").append(newRow);

});