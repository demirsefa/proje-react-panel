import React from 'react';
import '../styles/form.scss';
import { Screen } from '../types/Screen';
import { Layout } from '../components/layout/Layout';
import { Form } from './Form';

export function ControllerCreate({ screen }: { screen: Screen }) {

  return (
    <Layout>
      <Form screen={screen} />
    </Layout>
  );
}
