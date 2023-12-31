export class Messages {
    public static validation_messages = {
       
        'ChallanNo': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid ChallanNo' },
            { type: 'maxlength', message: 'Value must not be greater than 50 characters' },
        ],

        'email': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid email' },
            { type: 'maxlength', message: 'Email should not be more than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' }
        ],

        'password': [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password must be at least 8 characters ' },
            { type: 'maxlength', message: 'Password must be at most 20 characters ' },
            { type: 'pattern', message: 'Password must contain at least one uppercase, lowercase, number, special character and no space' },
            { type: 'tooltip', message: 'Password must be at least 8 and at most 20 characters ,must contain at least one uppercase, lowercase, number, special character and no space' }
        ],
        'value': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid Value' },
            { type: 'maxlength', message: 'Value must not be greater than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        'title': [
            { type: 'required', message: 'Title is required' },
            { type: 'pattern', message: 'Enter a valid Title' },
            { type: 'maxlength', message: 'Title must not be greater than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' }
        ],
        
    }    
}
