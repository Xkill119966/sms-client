
import React from 'react';
import PageHeader from '../PageHeader';

const PageHeaderWrapper = ({ title,id,type,para }) => (
  <>
    <PageHeader title={title} id={id} type={type} para={para}/>
  </>
);

export default PageHeaderWrapper;
