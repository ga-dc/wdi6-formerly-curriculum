function playWithScope() {
  var shmee = "Blah";
  var notQuiteGlobal = "Hooplah";
  globalShmee = "Blooh";
  
  function insideFunc() {
    console.log("insideFunc called");
    console.log(notQuiteGlobal);
    console.log(shmee);

    var shmee = "Bleeh";
    notQuiteGlobal = "Heeplah";

    console.log("insideFunc end");
    console.log(notQuiteGlobal);
    console.log(shmee);
  }

  insideFunc();

  console.log("playWithScope end.");
  console.log(shmee);
  console.log(notQuiteGlobal);
}
