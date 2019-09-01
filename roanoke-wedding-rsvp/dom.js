/*** DOM element creation and removal functions ***/

/**
 *  Creates an existing guest row
 */
function drawExistingGuestRow(guest) {
  let guestName = document.createElement("div");
  guestName.className += "name";

  let balloonEmoji = document.createElement("div");
  balloonEmoji.className += "balloon";
  balloonEmoji.appendChild(document.createTextNode("🎈"));
  guestName.appendChild(balloonEmoji);

  let guestNameText = document.createElement("div");
  guestNameText.appendChild(document.createTextNode(`${guest.FirstName} ${guest.LastName}`));
  guestName.appendChild(guestNameText);

  let select = this.createRsvpSelect(guest, "existingGuest");

  let guestRow = document.createElement("div");
  guestRow.className += "guestRow";
  guestRow.appendChild(guestName);
  guestRow.appendChild(select);

  return guestRow;
}

/**
 *  Creates an RSVP select element
 */
function createRsvpSelect(guest, existingGuestOrAdditionalGuest) {
  let select = document.createElement("select");
    
  let yes = document.createElement("option");
  yes.text = "Yes";
  yes.value = "yes";

  let no = document.createElement("option");
  no.text = "No";
  no.value = "no";

  let blank = document.createElement("option");
  blank.text = "--";
  blank.value = null;

  select.add(blank);
  select.add(yes);
  select.add(no);

  select.value = guest.RSVP;

  select.onchange = (e) => { 
    this.rsvpChange(guest, existingGuestOrAdditionalGuest, e.target.value); 
  };
  
  let label = document.createElement("span");
  label.className += "rsvpSelectLabel";
  label.appendChild(document.createTextNode("Attending?"));
  
  let selectWithRsvpLabel = document.createElement("div");
  selectWithRsvpLabel.className += "rsvpSelect";
  selectWithRsvpLabel.appendChild(label);
  selectWithRsvpLabel.appendChild(select);

  return selectWithRsvpLabel;
}

/**
 * Utility function for incrementing ids, used by addAdditionalGuestRow
 */
const nextID = (function() {
  let i = 1;
  return function() {
    i = i + 1;
    return i;
  };
})();

/**
 * Creates an additional guest row, and tracks that row in globalstate
 */
function addAdditionalGuestRow(rsvpAreaDiv) {
  let additionalGuestId = "additionalGuest_" + nextID();

  let additionalGuest = {
    id: additionalGuestId,
    FirstName: "",
    LastName: "",
    RSVP: null
  };
  
  let firstName = this.createInputWithLabel("First Name: ", "FirstName", additionalGuestId);
  let lastName = this.createInputWithLabel("Last Name: ", "LastName", additionalGuestId);
  let select = this.createRsvpSelect(additionalGuest, "additionalGuest");
  let removeRow = this.createRemoveAdditionalRow(additionalGuestId);

  let selectAndRemove = document.createElement("div");
  selectAndRemove.className += "selectAndRemove";
  selectAndRemove.append(removeRow);
  selectAndRemove.append(select);
  
  let addGuestRow = document.createElement("div");
  addGuestRow.id = additionalGuestId;
  addGuestRow.className += "addGuestRow";
  addGuestRow.appendChild(firstName);
  addGuestRow.appendChild(lastName);
  addGuestRow.appendChild(selectAndRemove);

  rsvpAreaDiv.appendChild(addGuestRow);

  this.globalstate.additionalGuests[additionalGuestId] = additionalGuest;
}

/**
 * Removes an additional guest row, and its globalstate information
 */
function removeAdditionalRow(additionalGuestId) {
  document.getElementById(additionalGuestId).remove();
  delete this.globalstate.additionalGuests[additionalGuestId];
}

/**
 * Creates an input element with passed in label
 */
function createInputWithLabel(labelText, inputKey, guestId) {
  let label = document.createElement("span");
  label.appendChild(document.createTextNode(labelText));

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.onchange = (e) => {
    this.inputChange(guestId, inputKey, e.target.value);
  }
  
  let inputWithLabel = document.createElement("div");
  inputWithLabel.className += "inputWithLabel";
  inputWithLabel.appendChild(label);
  inputWithLabel.appendChild(input);

  return inputWithLabel;
}

/**
 * Creates additional guest row removal element
 */
function createRemoveAdditionalRow(additionalGuestId) {
  let remove = document.createElement("div");
  remove.className += "removeEntry";
  remove.onclick = () => { this.removeAdditionalRow(additionalGuestId); }
  remove.appendChild(document.createTextNode("Remove This Entry"));
  return remove;
}
