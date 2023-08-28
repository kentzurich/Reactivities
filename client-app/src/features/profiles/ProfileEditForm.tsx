import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import { Button } from 'semantic-ui-react';
import ValidationError from "../errors/ValidationError";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditform({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore();
    return (
        <Formik 
            initialValues={{displayName: profile?.displayName, bio: profile?.bio, error: null}}
            onSubmit={(values, {setErrors}) => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                }).catch(error => 
                    setErrors({error}))
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({handleSubmit, isSubmitting, isValid, errors, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                    <ErrorMessage 
                        name='error'
                        render={() => <ValidationError errors={errors.error} />}
                    />
                    <Button 
                        disabled={!isValid || !dirty}
                        loading={isSubmitting} 
                        positive 
                        content='Update profile'
                        type="submit" 
                        floated='right'
                    />
                </Form>
            )}
        </Formik>
    )
})