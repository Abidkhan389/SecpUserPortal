import Swal from 'sweetalert2';
export const MessageTypes = {
    error: "Error",
    info: "Info",
    failure: "Failure",
    success: "Success",
    warning: "Warning",
}

export class Alerts {

    public static showErrorMessage(message, title?) {
        return Swal({
            title: title != null ? title : MessageTypes.error,
            text: message,
            type: 'error',
        });
    }

    public static showSuccessMessage(message, title?) {
        return Swal({
            title: title != null ? title : MessageTypes.success,
            text: message,
            type: 'success',
        });
    }

    public static showMessage(message, title?) {
        return Swal({
            title: title != null ? title : '',
            text: message,
        });
    }

    public static showInfoMessage(message, title?) {
        return Swal({
            title: title != null ? title : MessageTypes.info,
            text: message,
            type: 'info',
        });
    }

    public static showWarningMessage(message, showCancelButton, confirmButtonText, cancelButtonText, title?) {
        return Swal({
            title: title != null ? title : MessageTypes.warning,
            text: message,
            type: 'warning',
            showCancelButton: showCancelButton,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        });
    }

    public static showConfirmationMessage(confirmMessage?, confirmButtonText?, title?) {
        return Swal({
            title: confirmMessage != null ? confirmMessage : 'Are you sure to delete the record?',
            text: title,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText != null ? confirmButtonText : 'Delete',
            allowOutsideClick: false
        });
    }
    public static showConfirmation(confirmMessage?, confirmButtonText?, title?) {
        return Swal({
            title: confirmMessage != null ? confirmMessage : '',
            text: title,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText != null ? confirmButtonText : 'Cancel',
            allowOutsideClick: false
        });
    }

    public static showInfoMessageWithConfirmation(title?, html?, cancelButton?, confirmButtonText?) {
        return Swal({
            title: title != null ? title : '',
            html: html,
            type: 'info',
            showCancelButton: cancelButton,
            confirmButtonText: confirmButtonText ? confirmButtonText : 'OK',
            allowOutsideClick: false
        });
    }

    public static showDeletedSuccessfully(message?, title?) {
        return Swal({
            title: title != null ? title : 'Deleted!',
            text: message != null ? message : 'Your record has been deleted.',
            type: 'success'
        });
    }
}
