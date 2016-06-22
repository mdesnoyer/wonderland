# Cookie Usage

## In `SESSION`
- at the beginning of a session, AccessToken (used for authentication), RefreshToken (used for authentication), AccountId (unique account identification), (and MasqueradeAccountId (account id of a masquerade account) if applicable) are stored on login
- if the user wants their credentials remembered, credentials stored in RememberMeKey on login
- if the user wants their email remembered on login, email stored in RememberedEmailKey on login

## In `AnalyzeVideoForm`
- empty cookie stored on analyze/upload of a video

## In `VideoGuest`
- empty cookie stored on view of a shared link