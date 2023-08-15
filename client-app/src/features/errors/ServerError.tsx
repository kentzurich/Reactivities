import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Container, Header, Segment } from "semantic-ui-react";

export default observer(function ServerError() {
    const {commonStore} = useStore();

    return (
        <Container>
            <Header as='h1' content='Server Error' />
            <Header as='h5' color='red' content={(commonStore.error == null ? null : commonStore.error.message)} />
            {(commonStore.error == null ? null : commonStore.error.details) && (
                <Segment>
                    <Header as='h4' content='Stack Trace' color="teal" />
                    <code style={{marginTop: '10px'}}>{(commonStore.error == null ? null : commonStore.error.details)}</code>
                </Segment>
            )}
        </Container>
    )
})