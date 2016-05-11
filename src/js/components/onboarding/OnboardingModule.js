
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
        slideMax: 5,
        slideMin: 0,
        slides:[
            {
                message: "Please enter your Brightcove VideoCloud credentials",
                step: 1,
                inputs: {
                    input1: {
                        inputType: "Account ID"
                    },
                    input2: {
                        inputType: "Client ID"
                    },
                    input3: {
                        inputType: "Client Secret"
                    }
                },
                buttons: {
                    button1: {
                        name: "Submit",
                        type: "Submit",
                        extraContent: false,
                        response: "TODO"
                    }
                }
            },
            {
                message: "Do you use Brightcove to serve video thumbnails onto your site?",
                step: 2,
                buttons: {
                    button1: {
                        name: "Yes",
                        type: "button",
                        extraContent: false,
                        response: "Great! TODO"
                    },
                    button2: {
                        name: "No",
                        type: "button",
                        response: "Refer to doc TODO"
                    }
                }
            },
            {
                message: "Which Player Type do you Use?",
                step: 3,
                buttons: {
                    button1: {
                        name: "New Brightcove Player",
                        type: "button",
                        extraContent: true,
                        // response: "You will now see a list of all the Brightcove Players in your account. Click “enable” to add the Neon plugin to each player that you would like to receive analytics from."
                        response:[
                                "To insert the Telemetry Tag into your Gallery site:", 
                                "1. Log in to your Brightcove Account", 
                                "2. Navigate to your Gallery settings", 
                                "3. Select “Header”",
                                "4. Paste the Telemetry Tag into the Custom Header HTML field"]
                    },
                    button2: {
                        name: "Legacy Smart Player",
                        type: "button",
                        extraContent: true,
                        response: [
                        "You will now see a list of all the Brightcove Players in your account",
                        "Click “enable” to add the Neon plugin to each player that you would like to receive analytics from",
                        "Please add the URL below to each Legacy Smart Player in your Brightcove account that you’d like to optimize",
                        "1. Log in to your Brightcove Account(edited)",
                        "2. Go to https://videocloud.brightcove.com/publishing",
                        "3. For each player you want to add the plugin to:",
                        "a. Click Settings",
                        "b. In the resulting window and click “Plug-ins”",
                        "c. Paste the Neon Plugin URL to URL bar",
                        "d. Click “Add”"]
                    }
                }
            },
            {
                message: "Do you show thumbnails outside of your Brightcove players? For example, does your homepage include video thumbnails that, when clicked, bring you to an article page that contains the video whose thumbnail you clicked on the homepage?",
                step:4,
                buttons: {
                    button1: {
                        name: "Yes",
                        type: "button",
                        extraContent: false,
                        response: "telemetry tag TODO"
                    },
                    button2: {
                        name: "No",
                        type: "button",
                        extraContent: false,
                        response: "You are done"
                    }
                }
            },
            {
                message: "What kind of site do you have?",
                step: 5,
                buttons: {
                    button1: {
                        name: "Self-managed",
                        type: "button",
                        extraContent: false,
                        response: "Your Telemetry Tag can be added to your site using any tag manager (e.g. Tealium, Google Tag Manager, etc), or by adding it directly to the pages on your site that contain video thumbnail images you want to optimize."
                    },
                    button2: {
                        name: "Gallery",
                        type: "button",
                        extraContent: true,
                        response:
                            [
                                "To insert the Telemetry Tag into your Gallery site:", 
                                "1. Log in to your Brightcove Account", 
                                "2. Navigate to your Gallery settings", 
                                "3. Select “Header”",
                                "4. Paste the Telemetry Tag into the Custom Header HTML field"
                            ]
                    }
                }
            },
            {
                message: "Thanks you are now good to go",
                step: 6,
                buttons: {
                    button1: {
                        name: "home",
                        type: "button",
                        extraContent: true,
                        response: "ok great"
                }
            }
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


