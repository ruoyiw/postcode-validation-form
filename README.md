# Australian Location Validation From

Create an online form using React that accepts a postcode, suburb and state. When the user
submits the form, it should check the inputs with the Australia Post API to validate that it is a
valid address

## Tests to pass:
* Check that the entered postcode matches the suburb. If not, display an error
message. For example "The postcode 2000 does not match the suburb Broadway".
* Check that the entered suburb matches the state. If not, display an error message. For
example: "The suburb Ferntree Gully does not exist in the state Tasmania"
* If the postcode, suburb and state match, then display a success message. For
example: "The postcode, suburb and state entered are valid"

## Running the app locally

**Clone the repo:**

```
git clone git@github.com:ruoyiw/postcode-validation-form.git
cd postcode-validation-form
```

**Install the dependencies:**

```
yarn install
```

**Start the app in the development mode:**

```
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

**Run the proxy server by opening another tab, it will do the same request to Australia Post API but without CORS error:**

```
node src/utils/proxy.js
```

**Now you can submit the form to validate your input :)**



## Running test cases
The component unit tests can be run by

```
yarn test
```
It launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.