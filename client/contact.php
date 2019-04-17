<?php
if(isset($_POST['submit'])) {

    $message = 'My name is:' .$_POST['name'] ."\n"
                .'My e-mail is: ' .$_POST['email'] ."\n"
                .'Message: ' .$_POST['message'];

    $subject = $_POST['subject'];

    $mailTo = "lincarl517@gmail.com";

    mail($mailTo, $subject, $message);
    header("Location: contact.html?themessagewasrecieved!");

    if(@mail($mailTo, $subject, $message))
    {
        echo "Mail Sent Successfully";
    }
    else {
        echo "Mail Not Sent";
    }
}
?>