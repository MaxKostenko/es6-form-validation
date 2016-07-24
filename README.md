# es6-form-validation
Form Validation

###Validators:

|Abbr|Description|Allow empty|Example|
|---|---|---|---|
|`require`|Field isn't empty|false|require|
|`email`|Field is email|true|email|
|`length_{condition}`|Value length equal to condition|true|length_4|
|`minlength_{condition}`|Value length must be equal or more then contition|true|minlength_4|
|`maxlength_{condition}`|Value length must be equal or less then contition |true|maxlength_34|
|`number`|Any valid number|true|number|
|`min_{condition}`|Value must be more or equal to condition|true|min_4|
|`max_{condition}`|Value must be less or equal to condition|true|max_4|
|`int`|Value must be integer|true|int|
|`quantity`|Value must be positive integer|false|quantity|
|`checked`|Field must be checked||checked|
|`eq_{condition}`|Field with name from condition must have same value||eq_password|

###Examples:

1. Basic example
  
  ```html
<div>
		<form name="form_1" data-need-validate="1" >
			<div>
				<label>Email</label>
				<input name="email" data-validate="require email" />
			</div>
			<div>
				<label>Password</label>
				<input name="password" data-validate="require" />
			</div>
			<div>
				<input type="submit" value="login" />
			</div>
		</form>
</div>
<script>
		new FormValidation();
</script>
	
  ```
  
2. Empty values
  
  Empty values is alloved by default. If you want to forbid empty value you can use validator 'require'.
  
  ```html
<div>
		<label>Address</label>
		<input name="address" data-validate="require minlength_12" />
</div>
  ```

3. Ajax Form

	If you need form that send data by ajax you can set callback afterValidate. It will be called only if form is valid. Form submit won't be called if callback return false.
	```javascript
	
	let validation = new FormValidation({
			afterValidate: function() {
				let form = document.getElementById('form_1')
				$.get( '-your-url-', function( data ) {
					if( data.success ) {
						document.location = 'other-url';
					} else {
						//if server return errors
						if(data.errors) {
						
							//we can show error text in this way
							for( var key in data.errors ) {
								validation.setError(form[key], data.errors[key]);
							}
						}
					}
				} );
				return false;
			}
		});
	
	```

4. Custom CSS classes

	You can set custom CSS classes for field and error text block
	```javascript
		new FormValidation({
			errorInputClassName: 'warning',
			errorTextClassName: 'warningTxt',
		});
	```
	
5. Custom attributes

	You can use custom attributes to setup field validation
	```html
	<div>
		<form name="form_1" data-nv="1" >
		<div>
			<label>Email</label>
			<input name="email" data-v="require email" />
		</div>
		<div>
			<label>Password</label>
			<input name="password" type="password" data-v="require" />
		</div>
		<div>
			<input type="submit" value="login" />
		</div>
		</form>
	</div>
	<script>
		new FormValidation({
			autoApplyFormAttributeName: 'data-nv',
			validationAttributeName: 'data-v',
		});
	</script>
	
	```
	
6. Alternative submit

	You can attach form submit event to click event of any element. This element can be selected  by CSS selector.
	
	```html
	<div>
		<form name="form_1" data-need-validate="1" >
		...
		<div>
			<a class="sub" href="#">I am Submit</a>
		</div>
		...
		</form>
	</div>
	<script>
		new FormValidation({
			submitElementSelector: '.sub'
		});
	</script>
	```
	
7. Attach validation manually

	```javascript
	var validation = new FormValidation();
	validation.bind( document.getElementById( 'form_1' ) );
	```
	
8. Autotrim

	Values will be trimed automatically befor validation
	
	```javascript
	new FormValidation({
		autoTrim: true
	});
	```
	
9. Turn on default browser validation

	```javascript
	new FormValidation({
		defaultBrowserValidation: true
	});
	```
	
10. Custom error text

	Error message text can include palceholders {{val}} for current value and {{cond}} for validator condition
	
	```javascript
	new FormValidation({
		errors: {
				minlength: 'Value `{{val}}` incorect. Field must be at least {{cond}} characters'
		}
	});
	```

11. Custom error text from attributes

	You can use element attributes 'data-{validator.abbr}-error-text' for setting custom error text
	
	```html
		<div>
			<label>Full name</label>
			<input data-validate="require minlength_6" data-minlength-error-text="Custom minlength error {{val}}" value="name" />
		</div>
	```

12. Custom validator
	You can create custom validator that must be extended from AbstractValidator or AbstractNumberConditionValidator.
	
	```javascript
	class CustomValidator extends AbstractValidator {
		static get abbr() {
			return 'becustom';
		}


		get defaultErrorTextTpl() {
			return 'Value mustn\'t be `{{val}}`';
		}

		static test(value) {
			return 'Joe Doe' != value;
		}
	}
	
	new FormValidation({
			validators: [CustomValidator]
	});
	```
	
13. Errors output overriding
	
	You can override standard way of errors displaying
		
	```html
	<div>
		<form data-need-validate="1">
		<div>
			<label>Email</label>
			<input name="email" type="email" data-validate="require email" value="test"   />
			<i class="errorTxt"></i>
		</div>
		<div>
			<label>Full name</label>
			<input data-validate="require" value="" />
			<i class="errorTxt"></i>
		</div>
		<div>
			<input type="submit" value="login" />
		</div>
		</form>
	</div>
	<script>
		var validation = new FormValidation({
			//method is searching error block and return it
			getErrorTextBlock: function(field) {
				let element = field.nextElementSibling;
				if( element && element.classList.contains('errorTxt') ) {
					return element;
				}
				return null;
			},
			//setup error to error block
			setError: function(field, text) {
				field.classList.add('error');
				let errorBlock = this.getErrorTextBlock(field);
				if( errorBlock ) {
					errorBlock.innerHTML = text;
				}
			},
			//clear error block
			clearError: function(field) {
				field.classList.remove('error');
				let errorBlock = this.getErrorTextBlock(field);
				if( errorBlock ) {
					errorBlock.innerHTML = '';
				}
			}
		});
	</script>
	```
