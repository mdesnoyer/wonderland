
const onboardingSlides = {
    onboardSet: {
        introSlide: true,
        slideMax: 1,
        slideMin: 0,
        slides:[{
                message: "Please select which platform you use",
                buttons: {
                    button1: {
                        name:"BrightCove"
                    },
                    button2: {
                        name:"Other Platform"
                    },
                    button3: {
                        name:"No Platform"
                    }
                }
        }]
    },
    BrightCove: {
        inputTypes:["token1","token2"],
        slideMax: 3,
        slideMin: 0,
        slides:[
            {
                message: "Please Enter Your BrightCove Tokens",
                step: 1,
                inputs: {
                    input1: {
                        inputType: "token1"
                    },
                    input2: {
                        inputType: "token2"
                    }
                }
            },
            {
                message: "Do you use bright cove thumbnails?",
                step: 2,
                buttons: {
                    button1: {
                        name:"Yes",
                        action: "#"
                    },
                    button2: {
                        name:"No",
                        action:"#"
                    }
                }
            },
            {
                message: "Which Player Type do you Use?",
                step: 3,
                buttons: {
                    button1: {
                        name:"Smart Player"
                    },
                    button2: {
                        name:"HTMl5 Player"
                    }
                }
            },
            {
                message: "Thanks For the INFO!!",
                step:4
            }
        ]
    },
    "Other Platform": {
        slideMax: 1,
        slideMin: 0,
        slides:[
            {
            message: "TODO",
            step: 1
            }
        ]
    },
    "No Platform": {
        slideMax: 1,
        slideMin: 0,
        slides:[
            {
            message: "TODO",
            step:1
        }
        ]
    }

}

export default onboardingSlides


