// @flow

const makeRequired = (key: string, value: string, values: Object, errors: Object, callBack?: Function) => {
  let alreadyApplied = false;

  if (!values[key] || values[key] === '' || (Array.isArray(values[key]) && values[key].length === 0)) {
    errors[key] = `${value} is required`;
    alreadyApplied = true;
  }

  if (!alreadyApplied && callBack)
    callBack();
}

export const registerValidation = (values: Object) => {
  const errors = {};

  // Email
  makeRequired('email', 'Email', values, errors, () => {
    // eslint-disable-next-line
    const emailValidRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidRegExp.test(values.email)) {
      errors['email'] = 'Email is not valid. Example: example@gmail.com';
    }

    if (values.email.length < 4) {
      errors['email'] = 'Email length should be more than 4 symbols.';
    }
  });

  // Password
  makeRequired('firstName', 'First name', values, errors);

  // Password
  makeRequired('password', 'Password', values, errors, () => {
    if (values.password && values.password.length < 8){
      errors['password'] = 'Password length should be more than 8 symbols.';
    }
  });

  // Password confirmation
  makeRequired('passwordConfirmation', 'Password confirmation', values, errors, () => {
    if (values.passwordConfirmation !== values.password) {
      errors['password'] = "Passwords doesn't not match";
      errors['passwordConfirmation'] = "Passwords doesn't not match";
    }
  });

  // Terms and Conditions
  makeRequired('termsConditions', 'Terms and Conditions', values, errors, () => {
    if (!values.termsConditions) {
      errors['termsConditions'] = "Terms and Conditions should be checked";
    }
  });

  return errors;
}

export const createUserValidation = (values: Object) => {
  const errors = {};

  // Age
  makeRequired('age', 'Age', values, errors);

  // Gender
  makeRequired('sex', 'Gender', values, errors);

  // Password
  makeRequired('useOfCar', 'Use of car', values, errors);

  // Number of Teslas
  makeRequired('numberOfCars', 'Number of Teslas', values, errors);

  // Avatar
  // makeRequired('avatar', 'Avatar', values, errors);

  return errors;
}

export const vehicleRegistrationValidation = (values: Object) => {
  const errors = {};

  // VIN
  makeRequired('vin', 'VIN', values, errors, () => {
    if (values.vin.length < 17) {
      errors['vin'] = 'VIN number length should be 17 symbols.';
    }
  });

  // Vehicle Email
  makeRequired('vehicleEmail', 'Vehicle Email', values, errors, () => {
    // eslint-disable-next-line
    const emailValidRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidRegExp.test(values.vehicleEmail)) {
      errors['vehicleEmail'] = 'Email is not valid. Example: example@gmail.com';
    }

    if (values.vehicleEmail.length < 4) {
      errors['vehicleEmail'] = 'Email length should be more than 4 symbols.';
    }
  });

  // Vehicle Password
  makeRequired('vehiclePassword', 'Vehicle Password', values, errors);

  // selectTimezone
  makeRequired('selectTimezone', 'Timezone', values, errors);

  // Vehicle termsConditions
  // makeRequired('termsConditions', 'Terms and conditions', values, errors);

  return errors;
}

export const loginValidation = (values: Object) => {
  const errors = {};

  // Email
  makeRequired('email', 'Email', values, errors, () => {
    // eslint-disable-next-line
    const emailValidRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidRegExp.test(values.email)) {
      errors['email'] = 'Email is not valid. Example: example@gmail.com';
    }

    if (values.email.length < 4) {
      errors['email'] = 'Email length should be more than 4 symbols.';
    }
  });

  // Password
  makeRequired('password', 'Password', values, errors, () => {
    if (values.password && values.password.length < 8){
      errors['password'] = 'Password length should be more than 8 symbols.';
    }
  });

  return errors;
}

export const forgotValidation = (values: Object) => {
  const errors = {};

  // Email
  makeRequired('email', 'Email', values, errors, () => {
    // eslint-disable-next-line
    const emailValidRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidRegExp.test(values.email)) {
      errors['email'] = 'Email is not valid. Example: example@gmail.com';
    }

    if (values.email.length < 4) {
      errors['email'] = 'Email length should be more than 4 symbols.';
    }
  });

  return errors;
}

export const changePasswordValidation = (values: Object) => {
  const errors = {};

  // Password
  makeRequired('currentPassword', 'Current password', values, errors, () => {
    if (values.currentPassword && values.currentPassword.length < 8){
      errors['currentPassword'] = 'Current password length should be more than 8 symbols.';
    }
  });

  // Password
  makeRequired('newPassword', 'New password', values, errors, () => {
    if (values.newPassword && values.newPassword.length < 8){
      errors['newPassword'] = 'New password length should be more than 8 symbols.';
    }
  });

  // Password confirmation
  makeRequired('newPasswordConfirmation', 'New password confirmation', values, errors, () => {
    if (values.newPasswordConfirmation !== values.newPassword) {
      errors['newPassword'] = "Passwords doesn't not match";
      errors['newPasswordConfirmation'] = "Passwords doesn't not match";
    }
  });

  return errors;
}

export const updateUserValidation = (values: Object) => {
  const errors = {};

  // First name
  makeRequired('firstName', 'First name', values, errors);

  // Employee ID
  makeRequired('employeeId', 'Employee ID', values, errors);

  // Email
  makeRequired('email', 'Email', values, errors, () => {
    // eslint-disable-next-line
    const emailValidRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidRegExp.test(values.email)) {
      errors['email'] = 'Email is not valid. Example: example@gmail.com';
    }

    if (values.email.length < 4) {
      errors['email'] = 'Email length should be more than 4 symbols.';
    }
  });

  // Phone Number
  // makeRequired('phoneNumber', 'Phone Number', values, errors);

  // Distance unit
  makeRequired('distanceUnit', 'Distance unit', values, errors);

  // Select Timezone
  makeRequired('zoneId', 'Select Timezone', values, errors);

  // Currency
  makeRequired('currency', 'Currency', values, errors);

  return errors;
}

export const geofenceRegistrationValidation = (values: Object) => {
  const errors = {};

  // VIN
  makeRequired('vin', 'VIN', values, errors, () => {
    if (values.vin.length < 17) {
      errors['vin'] = 'VIN number length should be 17 symbols.';
    }
  });

  // Geofence Email
  makeRequired('geofenceEmail', 'Geofence Email', values, errors, () => {
    // eslint-disable-next-line
    const emailValidRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidRegExp.test(values.geofenceEmail)) {
      errors['geofenceEmail'] = 'Email is not valid. Example: example@gmail.com';
    }

    if (values.geofenceEmail.length < 4) {
      errors['geofenceEmail'] = 'Email length should be more than 4 symbols.';
    }
  });

  // Geofence Password
  makeRequired('geofencePassword', 'Geofence Password', values, errors);

  // selectTimezone
  makeRequired('selectTimezone', 'Timezone', values, errors);

  // Geofence termsConditions
  // makeRequired('termsConditions', 'Terms and conditions', values, errors);

  return errors;
}

export const updateGeofenceValidation = (values: Object) => {
  const errors = {};

  // Geofence Name
  makeRequired('geofenceName', 'Geofence Name', values, errors);

  // Email where Geofence alert will be sent
  makeRequired('geofenceEmail', 'Email where Geofence alert will be sent', values, errors, () => {
    // eslint-disable-next-line
    const emailValidRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidRegExp.test(values.geofenceEmail)) {
      errors['geofenceEmail'] = 'Email is not valid. Example: example@gmail.com';
    }

    if (values.geofenceEmail.length < 4) {
      errors['geofenceEmail'] = 'Email length should be more than 4 symbols.';
    }
  });

  // Geofence Type
  makeRequired('geofenceType', 'Geofence Type', values, errors);

  // Select Geofence
  makeRequired('geofence', 'Select Geofence', values, errors);

  // Select Feature
  makeRequired('selectedFeature', 'Select Feature area', values, errors);

  return errors;
}

export const updateRecordValidation = (values: Object) => {
  const errors = {};

  // Record Name
  makeRequired('recordName', 'Record Name', values, errors);

  // Email where Record alert will be sent
  makeRequired('recordEmail', 'Email where Record alert will be sent', values, errors, () => {
    // eslint-disable-next-line
    const emailValidRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidRegExp.test(values.recordEmail)) {
      errors['recordEmail'] = 'Email is not valid. Example: example@gmail.com';
    }

    if (values.recordEmail.length < 4) {
      errors['recordEmail'] = 'Email length should be more than 4 symbols.';
    }
  });

  // Record Type
  makeRequired('recordType', 'Record Type', values, errors);

  // Select Record
  makeRequired('record', 'Select Record', values, errors);

  // Select Feature
  makeRequired('selectedFeature', 'Select Feature area', values, errors);

  return errors;
}