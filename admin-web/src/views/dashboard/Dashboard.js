import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CSpinner,
  CFormSwitch,

  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'


import './dashboard.css'
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';

let array = []

const Dashboard = () => {

  const [row, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)


  React.useEffect(() => {

    loadAll();
  }, [])


  const loadAll = async () => {
    setLoading(true)
    console.log('LKJKL', loading)
    const url = 'getAllUsers'
    await fetch(url)
      .then((results) => results.json())
      .then((resData) => {
        array = resData.messages
        console.log('LKJKL', array)
      })
      setLoading(false)
  }

  const data = () => {
    return {
      columns: [
        {
          label: 'Name',
          field: 'user_name',
          width: 150,

        },
        {
          label: 'Email',
          field: 'user_email',
          width: 300,
        },
      ],
      rows: array,
    };
  };



  return (
    <>


      <CRow>
        <CCol xs>

       <div className="card">
        <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
            striped
            bordered
            hover
            entriesOptions={[10, 15, 20]}
            entries={10}
            pagesAmount={4}
            data={data()}
            materialSearch={true}
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
    </div>

        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
