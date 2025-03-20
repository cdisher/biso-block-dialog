import { Button, Heading, Modal, Placeholder, Container } from 'rsuite';
import styles from "./BlockDialog.module.css";
import 'rsuite/dist/rsuite.min.css';

function onCloseButtonClicked() {
  window.top!.postMessage({
    type: 'custom-dialog',
    action: 'close'
  }, "*");
}

export function BlockDialog(params: { title: string }) {
  return (
    <Container className={styles.dialog}>
      <Modal.Header>
        <Heading level={4}>{params.title}</Heading>
      </Modal.Header>
      <Modal.Body className={styles.body}>
        <Placeholder.Paragraph graph="image"/>
        <Placeholder.Paragraph/>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={onCloseButtonClicked}>
          Close
        </Button>
      </Modal.Footer>
    </Container>
  );
}
