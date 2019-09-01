  /** RSVP Front End page logic */
  
  globalstate = {
    "canAddGuest": "", // this user is or is not allowed to add guests
    "guests": [], // everything here is sent to updateExistingGuests 
    "additionalGuests": {}, // everything here is sent to addAdditionalGuests
  };
  
  window.onload = function(e) {
    let g = window.location.search.slice(1);

    this.getGuests(g).then(resp => {
      return resp.json();
    }).then(resp => {
      if (resp.error) {
        this.drawInvalidUrl();
      } else {
        this.globalstate.canAddGuest = resp.canAddGuest;    
        this.globalstate.guests = resp.guests;
        this.drawRSVP();
      } 
    }).catch(err => {
      this.drawInvalidUrl();
    });
  }

  function drawInvalidUrl() {
    let rsvpAreaDiv = document.getElementById("rsvpArea");

    let invalidPageMessage = document.createElement("div");
    invalidPageMessage.id = "invalidPageMessage";

    let message = document.createElement("div");
    message.appendChild(document.createTextNode("The URL is invalid!"));

    let instructions = document.createElement("div");
    instructions.appendChild(document.createTextNode("Please check your URL and try again, or scan the QR code on your mailer!"));

    invalidPageMessage.appendChild(message);
    invalidPageMessage.appendChild(instructions);

    rsvpAreaDiv.appendChild(invalidPageMessage);
  }

  function drawRSVP() {  
    // the whole rsvp area div
    let rsvpAreaDiv = document.getElementById("rsvpArea");

    // draw all existing guests in your cluster
    this.globalstate.guests.map(guest => {
      let guestRow = this.drawExistingGuestRow(guest);
      rsvpAreaDiv.appendChild(guestRow);
    });

    let buttonsDiv = document.getElementById("buttons");

    // add button
    if (this.globalstate.canAddGuest === "yes") { // guest can add other guests logic here
      let addGuestButtonDiv = document.createElement("div");
      addGuestButtonDiv.id = "addGuest";

      let addGuestButton = document.createElement("button");
      addGuestButton.textContent = "Add Guest";
      addGuestButton.onclick = () => { this.addAdditionalGuestRow(rsvpAreaDiv) };
      
      addGuestButtonDiv.appendChild(addGuestButton);
      buttonsDiv.appendChild(addGuestButtonDiv);
    }

    // draw submit button
    let submitRsvpButtonDiv = document.createElement("div");
    submitRsvpButtonDiv.id = "submitRsvp";

    let submitRsvpButton = document.createElement("button");
    submitRsvpButton.textContent = "Submit RSVP";
    submitRsvpButton.onclick = () => { this.submitRSVP();  };
      
    submitRsvpButtonDiv.appendChild(submitRsvpButton);
    buttonsDiv.appendChild(submitRsvpButtonDiv);
  }

  /**
   * 
   * Globalstate handler functions
   */
  function rsvpChange(guest, existingGuestOrAdditionalGuest, value) {
    // update an existing guest's rsvp
    if (existingGuestOrAdditionalGuest === "existingGuest") {
      let i = this.globalstate.guests.map(g => g.id).indexOf(guest.id);
      if (i > -1) { 
        this.globalstate.guests[i].RSVP = value; 
      }
    }

    // update an additional guest's rsvp
    if (existingGuestOrAdditionalGuest === "additionalGuest") {
      this.globalstate.additionalGuests[guest.id].RSVP = value;
    }
  }

  // only additional guests have input fields
  function inputChange(guestId, inputKey, value) {
    this.globalstate.additionalGuests[guestId][inputKey] = value;
  }

  /**
   * Submit the RSVP
   */
  function submitRSVP() {
    // make sure everything on the page is filled in
    // make the api calls
    let existingGuestsReady = true;
    this.globalstate.guests.forEach(guest => {
      if (guest.RSVP !== "yes" && guest.RSVP !== "no") {
        existingGuestsReady = false;
      }
    });

    let additionalGuestKeys = Object.keys(this.globalstate.additionalGuests);

    let additionalGuestsReady = true;
    additionalGuestKeys.forEach(guestId => {
      let additionalGuest = this.globalstate.additionalGuests[guestId];
      if (additionalGuest.FirstName === "" || additionalGuest.LastName === "" || (additionalGuest.RSVP !== "yes" && additionalGuest.RSVP !== "no")) {
        additionalGuestsReady = false;
      }
    });

    if (existingGuestsReady === false || additionalGuestsReady === false) {
      this.drawNeedToCompleteRsvpMessage();
    } else {
      let responses = [];
      this.submitRSVPCalls().then(response => {
        let errors = response.filter(resp => {
          return resp.status !== 200;
        });
        if (errors.length === 0) {
          this.drawSuccess();
        } else {
          this.drawPleaseTryAgain();
        }
      });
    }
  }

  /**
   * Draw Messages to the user
   */
  function drawSuccess() {
    // if this message is already drawn, we're done here
    if (document.getElementById("message").innerHTML !== "Thank you! RSVP submitted") {
      // ok, need to swap out message inside these divs with this message
      document.getElementById("userMessageArea").className = "withMessage";

      let message = document.getElementById("message");
      message.className = "success";
      message.innerHTML = "Thank you! RSVP submitted";

      let emoji = document.getElementById("emoji");
      emoji.innerHTML = "👯‍♀️";
    }
  }

  function drawPleaseTryAgain() {
    // if this message is already drawn, we're done here
    if (document.getElementById("message").innerHTML !== "There was a problem! Please try again") {
      // ok, need to swap out message inside these divs with this message
      document.getElementById("userMessageArea").className = "withMessage";

      let message = document.getElementById("message");
      message.className = "error";
      message.innerHTML = "There was a problem! Please try again";

      let emoji = document.getElementById("emoji");
      emoji.innerHTML = "🤔";
    }
  }

  function drawNeedToCompleteRsvpMessage() {    
    // if this message is already drawn, we're done here
    if (document.getElementById("message").innerHTML !== "Please complete your entire RSVP!") {
      // ok, need to swap out message inside these divs with this message
      document.getElementById("userMessageArea").className = "withMessage";
      
      let message = document.getElementById("message");
      message.className = "error";
      message.innerHTML = "Please complete your entire RSVP!";

      let emoji = document.getElementById("emoji");
      emoji.innerHTML = "🤹🏻‍♀️";
    }
  }
