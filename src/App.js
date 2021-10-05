import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [array, setArray] = useState([])
  const [anagrams, setAnagrams] = useState([])
  const [str, setStr] = useState("")
  const [resultVis, setResultVis] = useState("")


  useEffect( () => {},[anagrams])

  /* call merge sort on an array of characters*/
  const _mergeArrays = (a, b) => {
    const c = []
  
    while (a.length && b.length) {
      c.push(a[0] > b[0] ? b.shift() : a.shift())
    }
  
    //if we still have values, let's add them at the end of `c`
    while (a.length) {
      c.push(a.shift())
    }
    while (b.length) {
      c.push(b.shift())
    }
  
    return c
  }
  
  const mergeSort = (a) => {
    if (a.length < 2) return a
    const middle = Math.floor(a.length / 2)
    const a_l = a.slice(0, middle)
    const a_r = a.slice(middle, a.length)
    const sorted_l = mergeSort(a_l)
    const sorted_r = mergeSort(a_r)
    return _mergeArrays(sorted_l, sorted_r)
  }

  function strCheck(str1, str2){
    const string1 = mergeSort(Array.from(str1.replace(/ /g, ""))) //trim spaces, convert to chars and then use mergeSort to sort the characters
    const string2 = mergeSort(Array.from(str2.replace(/ /g, "")))

    if (string1.length !== string2.length){
      return false; //not an anagram
    }else{
      //iterate over the characters in strings
      for (let i=0; i< string1.length; i++){
        if (string1[i] !== string2[i]) return false; //if they differ, return false
      }
      //if no difference was found, return true
      return true;
    }

  }

  
  /* event handler */

  const pressEnter = (event) =>{
    if (event.key === "Enter"){
      array.push(str);
      setStr("")
      console.log("array ---")
      console.log(array)
    }
  }

  const onChangeString = (event) =>{
    setStr(event.target.value);
    console.log(str)
  }

  const merge = () =>{
    const array_copy = array.slice()

    const index_array = new Array(array.length);
    for (let ind = 0; ind < index_array.length; ind++){
      index_array[ind] = ind;
    }
    console.log(index_array);

    console.log("before merge ---")
    console.log(array_copy)

    for (let i=0; i< array.length; i++){
      const tmp_res = [];
      //check if the element at i is part of the index_array, meaning that it was not yet found to be an anagram of another word
      if ( index_array.includes(i) ){
      tmp_res.push(array[i]);
      //linear scan of the following words and check
      for (let j=i+1; j< array.length; j++){
        console.log(j)
        //check if j is still part of the index array
        if ( strCheck(array[i],array[j])){
          console.log("match between " + array[i] + " and " + array[j])
          //insert the element at [j] into tmp res
          tmp_res.push(array[j])
          console.log("tmp_res is now: ")
          console.log(tmp_res)
          //remove the element with value [j] from the index array, so that there's no iteration over it
          const index = index_array.indexOf(j);
          if (index > -1) {
            index_array.splice(index, 1);
          }
          console.log("index array --- ")
          console.log(index_array)
        }
      } //loop with j over the linear length of the array
      //now push tmp_res into anagrams
      anagrams.push(tmp_res)
      console.log("anagrams ---")
      console.log(anagrams)
      }//otherwise if the index "i" does not belong to index_array, skip to the next iteration, as it was already found to be an anagram

    }//for loop

    setResultVis("visible");

  }

  return (
    <div className="App">
      
        <h1>
          Check Anagrams App
        </h1>
        <p className="inst">INSTRUCTIONS: Insert a string and then press ENTER to confirm. Repeat to insert other strings into the list.<br/>
        To reset the input and enter a new set of strings, please refresh the page.</p>
        <input 
          className="input"
          type="text"
          placeholder={"Insert a string..."}
          value={str}
          onChange={onChangeString}
          onKeyPress={pressEnter}
        >
        </input>
        
        <div className="listContainer">

        <p>List of Strings:</p>
        <ul className="strList">
            {array.map( (value,index) => {
                return (<li key={index}>{value}</li>);
            })}
        </ul>
        </div>
        <button className="button" onClick={merge}>Get Anagrams</button>
        <ul className="resList" style={{visibility: resultVis}}>
          {
           anagrams.map( (a,index) =>{
             return(
               <li key={index}>Group {index+1} comprises: 
                  {
                    a.map((item,ind) =>{
                      return(<p key={ind}>
                        {item}
                      </p>)
                    })
                  }
              </li>
             )
             
           })

          }
        </ul>
    </div>
  );


}

export default App;
