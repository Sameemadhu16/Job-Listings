import React from 'react';
import { Modal, Button } from 'flowbite-react';

export default function CompanyDetailsModal({ isOpen, onClose }) {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        Company Details
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Company Name: Example Corp
          </h3>
          <p className="text-sm text-gray-500">
            Location: Idaho, USA
          </p>
          <p className="text-sm text-gray-500">
            Salary: $15K-20K
          </p>
          <p className="text-sm text-gray-500">
            Description: This is a great company to work for...
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
