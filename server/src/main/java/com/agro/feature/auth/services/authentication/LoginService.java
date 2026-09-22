package com.agro.feature.auth.services.authentication;

import com.agro.feature.auth.dtos.request.Credentials;
import com.agro.feature.auth.services.userDetails.UserCredentials;

public interface LoginService {
    UserCredentials login(Credentials credentials);}
