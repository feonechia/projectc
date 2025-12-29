import React, { useState } from 'react';
import { Accordion, Dropdown, Form, ListGroup } from 'react-bootstrap';
import style from './Settings.module.css'
interface SettingsSection {
  id: string;
  name: string;
}

const settingsSections: SettingsSection[] = [
  { id: 'profile', name: 'Profile' },
  { id: 'account', name: 'Account' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'privacy', name: 'Privacy' },
];
const Setting: React.FC = () => {

 const currencies: string[] = ['USD', 'KRW'];
  const [selectedCurrency, setSelectedCurrency] = useState<string>('KRW');

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedCurrency(eventKey);
    }
  };

  return (
    <div>
      <h2>설정</h2>
      <div className={style.container}>
        <Accordion defaultActiveKey="2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>자산관리</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroup.Item style={{color:'black'}} action href="/setting/assets">
                  자산설정
                </ListGroup.Item>
                <ListGroup.Item style={{color:'black'}} action href="/setting/income">
                  수입분류 관리
                </ListGroup.Item>
                <ListGroup.Item style={{color:'black'}} action href="/setting/expense">
                  지출분류 관리
                </ListGroup.Item>
                <ListGroup.Item style={{color:'black'}} action href="/setting/budget">
                  예산금액 설정
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>설정관리</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <ListGroup.Item>
                  주 화폐 설정
                  <Dropdown onSelect={handleSelect} style={{display:'inline-block', marginLeft:'80%'}}>
                  <Dropdown.Toggle variant="primary" id="dropdown-currency">
                    {selectedCurrency}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {currencies.map((currency) => (
                      <Dropdown.Item
                        key={currency}
                        eventKey={currency}
                        active={currency === selectedCurrency}
                      >
                        {currency}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                </ListGroup.Item>

                <ListGroup.Item>
                  내역에서 메모 표시하기
                  <Form.Check style={{marginLeft:'92%'}}
                    type="switch"
                    id="custom-switch"
                  // label="내역에서 메모 표시하기 Mode"
                  />
                </ListGroup.Item>

              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>스타일</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="Dark Mode"
                />
              </Form>
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>


      </div >
    </div>
  );
}
export default Setting