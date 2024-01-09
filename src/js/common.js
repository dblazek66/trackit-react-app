

function getToday() {
    let dte = new Date().toISOString();
    return dte.substring(0, 10);
}

function formatSchedDate(dte){
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    let schedDate  = new Date(dte)
    let formatDate = schedDate.toLocaleDateString('en-US',options)
    if(formatDate == "Invalid Date") return ""
    return formatDate
}

function validateForm(){
    const forms = document.querySelectorAll('form');
    const form = forms[0];
    let empt=0
    Array.from(form.elements).forEach((input) => {
      if(input.required && !input.value){
        empt++
        input.focus()
      }
    });
    if(empt>0){
      alert('Please complete required fields')
      return false
    }
    return true
  }

  function handleContactAge(dlc) {
    let lastContact = new Date(dlc);
    if (lastContact == "Invalid Date") lastContact = new Date();
    let today = new Date();
    let diff = today.getTime() - lastContact.getTime();
    let days = Math.round(diff / (1000 * 3600 * 24));
    return days
    //setAge(days);
  }


const timesList =[
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",    
]

  const stateList = [
    {
      "name": "Alabama",
      "code": "AL"
    },
    {
      "name": "Alaska",
      "code": "AK"
    },
    {
      "name": "Arizona",
      "code": "AZ"
    },
    {
      "name": "Arkansas",
      "code": "AR"
    },
    {
      "name": "California",
      "code": "CA"
    },
    {
      "name": "Colorado",
      "code": "CO"
    },
    {
      "name": "Connecticut",
      "code": "CT"
    },
    {
      "name": "Delaware",
      "code": "DE"
    },
    {
      "name": "Florida",
      "code": "FL"
    },
    {
      "name": "Georgia",
      "code": "GA"
    },
    {
      "name": "Hawaii",
      "code": "HI"
    },
    {
      "name": "Idaho",
      "code": "ID"
    },
    {
      "name": "Illinois",
      "code": "IL"
    },
    {
      "name": "Indiana",
      "code": "IN"
    },
    {
      "name": "Iowa",
      "code": "IA"
    },
    {
      "name": "Kansas",
      "code": "KS"
    },
    {
      "name": "Kentucky",
      "code": "KY"
    },
    {
      "name": "Louisiana",
      "code": "LA"
    },
    {
      "name": "Maine",
      "code": "ME"
    },
    {
      "name": "Maryland",
      "code": "MD"
    },
    {
      "name": "Massachusetts",
      "code": "MA"
    },
    {
      "name": "Michigan",
      "code": "MI"
    },
    {
      "name": "Minnesota",
      "code": "MN"
    },
    {
      "name": "Mississippi",
      "code": "MS"
    },
    {
      "name": "Missouri",
      "code": "MO"
    },
    {
      "name": "Montana",
      "code": "MT"
    },
    {
      "name": "Nebraska",
      "code": "NE"
    },
    {
      "name": "Nevada",
      "code": "NV"
    },
    {
      "name": "New Hampshire",
      "code": "NH"
    },
    {
      "name": "New Jersey",
      "code": "NJ"
    },
    {
      "name": "New Mexico",
      "code": "NM"
    },
    {
      "name": "New York",
      "code": "NY"
    },
    {
      "name": "North Carolina",
      "code": "NC"
    },
    {
      "name": "North Dakota",
      "code": "ND"
    },
    {
      "name": "Ohio",
      "code": "OH"
    },
    {
      "name": "Oklahoma",
      "code": "OK"
    },
    {
      "name": "Oregon",
      "code": "OR"
    },
    {
      "name": "Pennsylvania",
      "code": "PA"
    },
    {
      "name": "Rhode Island",
      "code": "RI"
    },
    {
      "name": "South Carolina",
      "code": "SC"
    },
    {
      "name": "South Dakota",
      "code": "SD"
    },
    {
      "name": "Tennessee",
      "code": "TN"
    },
    {
      "name": "Texas",
      "code": "TX"
    },
    {
      "name": "Utah",
      "code": "UT"
    },
    {
      "name": "Vermont",
      "code": "VT"
    },
    {
      "name": "Virginia",
      "code": "VA"
    },
    {
      "name": "Washington",
      "code": "WA"
    },
    {
      "name": "West Virginia",
      "code": "WV"
    },
    {
      "name": "Wisconsin",
      "code": "WI"
    },
    {
      "name": "Wyoming",
      "code": "WY"
    }
  ]
  export {
    getToday,
    stateList,
    formatSchedDate,
    timesList,
    validateForm,
    handleContactAge
}
