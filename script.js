"use strict";

const handler = {
  operator_was_hit: false,
  capture_string: 0,
  counter_first_hit: 0,
  counter_chain: 0,
  parsed_arg: 0,
  parsed_arg_2: 0,
  which_string_is: 0,
  opcode: 0,
  // got_second_str: false,
  // got_first_str: false,
  op_result: 0,
  op_was_made: false,
  prev_opcode: 0,
};

const select_all_buttons = () => {
  // this returns a NodeList of button then we loop through each of them
  document.querySelectorAll("button").forEach((button) => {
    // add an event listener to each button
    button.addEventListener("click", () => {
      handle_each_click(button);
      //handlered_operators();
    });
  });
};

const show_chained_calculation = (button) => {
  let displayNumber = document.querySelector(".calculation-chain");
  displayNumber.style.display = "block";

  if (displayNumber.value === "0" && handler.counter_chain === 0) {
    // clear the input when user starts typing
    handler.counter_chain++;
    displayNumber.value = "";
  }

  if (!button.classList.contains("all-clear")) {
    // prevent writing operators to the display
    displayNumber.value += button.textContent;
  }
  if (handler.op_was_made) {
    displayNumber.value += handler.op_result;
  }
};

const show_unchained_calculation = (button) => {
  debugger
  let displayNumber = document.querySelector(".calculator-screen__input"); // get the input element of display
  // checks if only numbers were hit
  if (!button.classList.contains("operator")) {
    handler.operator_was_hit = false;
  }

  // clears the input when user starts typing
  if (displayNumber.value === "0" && handler.counter_first_hit === 0) {
    handler.counter_first_hit++;
    displayNumber.value = "";
  }

  // prevents writing operators to the display
  if (
    !handler.operator_was_hit &&
    !button.classList.contains("operator") &&
    !handler.op_was_made
  ) {
    displayNumber.value += button.textContent;
  }

  // means there is an string to get
  if (handler.capture_string === 1 && handler.operator_was_hit) {
    calculation(displayNumber);
  }
  if (handler.op_was_made) {
    displayNumber.value += handler.op_result;
    handler.op_was_made = false;
  }
};

//const show_result = (displayNumber) => {}
const get_parsed_string = (displayNumber) => {
  let argument = displayNumber.value;
  displayNumber.value = "";
  return +argument;
};

const equal_interruption = () => {
  document.querySelector(".calculator-screen__input").value = handler.op_result;
};

const calculation = (displayNumber) => {
  //debugger;
  if (handler.which_string_is === 0) {
    handler.parsed_arg = get_parsed_string(displayNumber);
    handler.capture_string--;
    //console.log("First number:", handler.parsed_arg);
  } else if (handler.which_string_is === 1) {
    handler.parsed_arg_2 = get_parsed_string(displayNumber);
    handler.capture_string--;
    //console.log("Second number:", handler.parsed_arg_2);
  }

  // gets first one then the second one
  handler.which_string_is++;

  if (handler.which_string_is === 2) {

    
      switch (handler.prev_opcode) {
        case 1:
          handler.op_was_made = true;
          handler.op_result = handler.parsed_arg + handler.parsed_arg_2;
          break;
        case 2:
          handler.op_was_made = true;
          handler.op_result = handler.parsed_arg - handler.parsed_arg_2;
          break;
        case 3:
          handler.op_was_made = true;
          handler.op_result = handler.parsed_arg * handler.parsed_arg_2;
          break;
        case 4:
          handler.op_was_made = true;
          handler.op_result = handler.parsed_arg / handler.parsed_arg_2;
          break;
        case 5:
          handler.op_was_made = true;
          handler.op_result = handler.parsed_arg % handler.parsed_arg_2;
          break;
        case 6: 

          break;
        default:
          break;
      }
    
   
 
    handler.which_string_is = 0;
  }

  return handler.op_result;
};

const handle_each_click = (button) => {
  //debugger;
  if (button.classList.contains("operator")) {
    switch (button.textContent) {
      case "AC":
        handler.prev_opcode = handler.opcode
        handler.which_string_is = 0; // ac before hitting equal
        handler.operator_was_hit = true; // control not display operator
        handler.counter_first_hit = 0; // make the first hit again
        handler.counter_chain = 0;
        document.querySelectorAll("input").forEach((input) => {
          input.value = "0";
        });
        break;
      case "+":
        handler.prev_opcode = handler.opcode
        handler.opcode = 1;
        handler.capture_string++;
        handler.operator_was_hit = true;
        break;
      case "-":
        handler.prev_opcode = handler.opcode
        handler.opcode = 2;
        handler.capture_string++;
        handler.operator_was_hit = true;
        break;
      case "*":
        handler.prev_opcode = handler.opcode
        handler.opcode = 3;
        handler.capture_string++;
        handler.operator_was_hit = true;
        break;
      case "/":
        handler.prev_opcode = handler.opcode
        handler.opcode = 4;
        handler.capture_string++;
        handler.operator_was_hit = true;
        break;
      case "%":
        handler.prev_opcode = handler.opcode
        handler.opcode = 5;
        handler.capture_string++;
        handler.operator_was_hit = true;
        break;
      case "=":
        handler.prev_opcode = handler.opcode
        handler.opcode = 6;
        handler.capture_string++;
        handler.operator_was_hit = true;

        break;
      default:
        return;
    }
  }

  show_unchained_calculation(button);
  show_chained_calculation(button);
};

const main = () => {
  select_all_buttons();
};
main();
