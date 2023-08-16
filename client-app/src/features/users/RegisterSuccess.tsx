import React from 'react';
import useQuery from '../../app/util/hooks';
import agent from '../../app/api/agents';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function RegisterSuccess() {
    const email = useQuery().get('email') as string;

    function handleConfirmEmailResend () {
        agent.account.resendEmailConfirm(email).then(() => {
            toast.success('Verification email resent - please check your email.')
        }).catch(error => console.log(error));
    }

    return (
        <Segment placeholder textAlign='center'>
            <Header icon color='green'>
                <Icon name='check' />
                Successfully registered!
            </Header>
            <p>Please check your email (including junk mail) for the verification email.</p>
            {email &&
                <>
                    <p>Didn't received email? Click button below to resend</p>
                    <Button 
                        primary 
                        onClick={handleConfirmEmailResend} 
                        content='Resend email'
                        size='huge'
                    />
                </>
            }
        </Segment>
    )
}