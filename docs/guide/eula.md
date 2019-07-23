# EULA

The EULA must be read and accepted prior to using any other API endpoints. 

The [email eula](https://api-user.arable.cloud/api/v2/doc#operation/post_eula_email) endpoint can be used to receive a copy of EULA (Terms and Conditions) in an email.

Example:
``` bash
curl -X POST \
  https://api-user.arable.cloud/api/v2/eulas/email \
  -H 'Authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE=' \
```

The above request will send the ` Terms and Conditions ` email to the current user. 

Once read, the EULA can be accepted by calling the [accept eula](https://api-user.arable.cloud/api/v2/doc#operation/post_user_eula) endpoint, which will update the EULA signed date for the user, to indicate that user has signed current EULA.

