import React, { Component } from 'react';
import { Form, FormGroup, Button,Container, Col, Alert } from 'reactstrap';
import SingleInput from './single_input';
import { Bubblechart } from './chart';
import data from './/..//../data/data';


const child_color_array = ["#008B00", "#F2F2F2", "#4FE378", "#1EC746"];
const parent_color_array = ["#878787", "#F3F3F3"];

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {

// textInput = SingleInput Component
// Search for "text" in this file for all Select handling
			child_color_array: child_color_array,
			parent_color_array: parent_color_array,
			data: data,
			dimWordsInput: '',
			scoreDimWordsInput: '',
			modelIdInput: '',
			textInputValid: true,

			inputInProcess: true,
			formIsValid: true
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);

		this.handleTextInputFocus = this.handleTextInputFocus.bind(this);
		this.handleTextInputChangeDim = this.handleTextInputChangeDim.bind(this);
		this.handleTextInputChangeScoreDim = this.handleTextInputChangeScoreDim.bind(this);
		this.handleTextInputChangeModelId = this.handleTextInputChangeModelId.bind(this);
    	this.handleTextInputBlur = this.handleTextInputBlur.bind(this);
		this.textInputValidityDim = this.textInputValidityDim.bind(this);
		this.textInputValidityDimScore = this.textInputValidityDimScore.bind(this);
		this.textInputValidityModelId = this.textInputValidityModelId.bind(this);
		console.log('Always : ',data);				
	}
	// textInput functions

	handleTextInputFocus() {
		this.setState( { textInputValid: true,
		 		inputInProcess: true });
	}

	handleTextInputChangeDim(e) {
		this.setState( { inputInProcess: true });
		this.setState({ 
			dimWordsInput: e.target.value}, () => {
		});
	}
	
	handleTextInputChangeScoreDim(e) {
		this.setState( { inputInProcess: true });
		this.setState({ 
			scoreDimWordsInput: e.target.value}, () => {
		});
	}
	handleTextInputChangeModelId(e) {
		this.setState( { inputInProcess: true });
		this.setState({ 
			modelIdInput: e.target.value}, () => {
		});
	}

	handleTextInputBlur() {
		this.textInputValidityDim();
		this.textInputValidityDimScore();
		this.textInputValidityModelId();
	}

	textInputValidityDim() {
		const valid = (this.state.dimWordsInput !== false) &&
			(this.state.dimWordsInput.replace(/\s/g, '').length !== 0);

		this.setState(() => ({ textInputValid: valid }));
		return valid;
	}
	textInputValidityDimScore() {
		const valid = (this.state.scoreDimWordsInput !== false) &&
			(this.state.scoreDimWordsInput.replace(/\s/g, '').length !== 0);

		this.setState(() => ({ textInputValid: valid }));
		return valid;
	}
	textInputValidityModelId() {
		const valid = (this.state.modelIdInput !== false) &&
			(this.state.modelIdInput.replace(/\s/g, '').length !== 0);

		this.setState(() => ({ textInputValid: valid }));
		return valid;
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			dimWordsInput: '',
			scoreDimWordsInput: '',
			modelIdInput: '',
			textInputValid: true,
			inputInProcess: true
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();

		this.setState(() => {
			return { inputInProcess: false };
		});

		const formPayload = {
			dimWordsInput: this.state.dimWordsInput,
			scoreDimWordsInput: this.state.scoreDimWordsInput,
			modelIdInput: this.state.modelIdInput
		};
		if (!this.formValidity()) {
			this.setState( { formIsValid: false });
			console.log("In Search/handleFormSubmit. " +
			"formValidity returned false. formPayload: ", formPayload);
			return false;
		}

		this.setState( { formIsValid: true });
		console.log("In Search/handleFormSubmit. Submitting now. formPayload: ", formPayload);
	}

	formValidity() {
		if(this.state.dimWordsInput || this.state.scoreDimWordsInput || this.state.modelIdInput){
			return (this.textInputValidityDim() && this.textInputValidityDimScore() && this.textInputValidityModelId());
		}
		
	}

	render() {

		const colWidth = { xl: "6", md: "8", sm: "10", xs: "12" };

		return (
			<div className="main-div">
			<Container style={{ border: "solid 2px #DDDDDD", borderRadius: "10px", margin: "30px", padding: "20px" }}>
				<h2>Case Study</h2>
				<Form onSubmit={this.handleFormSubmit}>
					<SingleInput
						inputType={'text'}
						title={'Dim Words:'}
						name={'dimWordsInput'}
						changeFunc={this.handleTextInputChangeDim}
		        blurFunc={this.handleTextInputBlur}
						focusFunc={this.handleTextInputFocus}
						content={this.state.dimWordsInput}
						placeholder={''}
					 	valid={this.state.textInputValidDim}
					 	feedback = {'Text input is required!'}
						colWidth = {colWidth} />

					<SingleInput
						inputType={'text'}
						title={'Score Dim Words:'}
						name={'scoreDimWordsInput'}
						changeFunc={this.handleTextInputChangeScoreDim}
		        blurFunc={this.handleTextInputBlur}
						focusFunc={this.handleTextInputFocus}
						content={this.state.scoreDimWordsInput}
						placeholder={''}
					 	valid={this.state.textInputValidityDimScore}
					 	feedback = {'Text input is required!'}
						colWidth = {colWidth} />

					<SingleInput
						inputType={'text'}
						title={'Model Id:'}
						name={'modelIdInput'}
						changeFunc={this.handleTextInputChangeModelId}
		        blurFunc={this.handleTextInputBlur}
						focusFunc={this.handleTextInputFocus}
						content={this.state.modelIdInput}
						placeholder={''}
					 	valid={this.state.textInputValidityModelId}
					 	feedback = {'Text input is required!'}
						colWidth = {colWidth} />

					<FormGroup>
						<Col {...colWidth}>
						<Button color="link"
							onClick={this.handleClearForm}>Clear form
						</Button>
						<Button type="submit" color="Primary">
							Submit
						</Button>
						</Col>
			 		</FormGroup>
				</Form>

				<FormGroup>
					<Col {...colWidth}>
			{ !this.state.formIsValid && !this.state.inputInProcess &&
				<Alert color="danger">
        	Error in form values. Please check and submit again.
      	</Alert>
			}
			{ this.state.formIsValid && !this.state.inputInProcess &&
				<Alert color="info">
        	Submitting the form...
      	</Alert>
			}
		</Col>
	</FormGroup>
	 </Container>
	 { this.state.formIsValid && !this.state.inputInProcess &&
		<div className="svg-container">
	 		<Bubblechart {...this.state}></Bubblechart>
	 	</div>
			}
	 	
	 </div>
		);
	}
}
