/*** REST api calls ***/
// local: http://localhost:8080
// production: https://maridor.appspot.com

/**
 * GET request to getGuestCluster
 */
function getGuests(g) {
  return fetch("https://maridor.appspot.com/getGuestCluster/" + g);
}


/**
 * POST request to updateGuestRsvps
 */
function updateExistingGuests() {
  let g = window.location.search.slice(1);
  
  return fetch("https://maridor.appspot.com/updateGuestRsvps/" + g, {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.globalstate.guests)
  });
}

/**
 * POST request to createGuest
 */
function addAdditionalGuest(guest) {
  let addedBy = window.location.search.slice(1);
  let params = {
    "FirstName": guest.FirstName,
    "LastName": guest.LastName,
    "rsvp": guest.RSVP,
    "AddedByCode": addedBy
  };
  
  return fetch("https://maridor.appspot.com/createGuest/", {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}

/**
 * function to make necessary API RSVP calls
 */
function submitRSVPCalls() {
  let calls = [];
  calls.push(this.updateExistingGuests());

  let additionalGuestKeys = Object.keys(this.globalstate.additionalGuests);

  if (additionalGuestKeys.length > 0) {
    additionalGuestKeys.forEach(g => {
      calls.push(this.addAdditionalGuest(this.globalstate.additionalGuests[g]));
    });
  }
  
  return Promise.all(calls);
}
