import { useField } from 'formik';
import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { SemanticDatepickerProps } from 'react-semantic-ui-datepickers/dist/types';
import { Form, Label } from 'semantic-ui-react';

export default function MyDateInputSUI(props: Partial<SemanticDatepickerProps>) {
    const [field, meta, helpers] = useField(props.name!);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <SemanticDatepicker  
                {...field}
                {...props}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}