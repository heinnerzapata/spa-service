import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IUserState } from 'store/user/reducer';
import { WithTranslation, withTranslation } from 'react-i18next';

import {
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
  UncontrolledDropdown,
} from 'reactstrap';

import { userLogOut } from 'store/user/actions';
import { Skeleton } from '@material-ui/lab';

interface IV7HeaderProfilerProps {
  userReducer?: IUserState;
  onLogOut: (hexId: string) => void;
  t: any;
}

const V7HeaderProfiler: React.FC<IV7HeaderProfilerProps> = (props) => {
  // eslint-disable-next-line max-len
  const companyPhoto = 'https://ph-files.imgix.net/748783c9-4cb4-467b-b74c-365b0661e6c0.gif?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop';
  const history = useHistory();
  const [userInfo, setuserInfo] = useState(props.userReducer?.userInfo);

  const handlerLogout = (e: any) => {
    e.preventDefault();
    props.onLogOut(props.userReducer?.userInfo.email);
  };

  useEffect(() => {
    setuserInfo(props.userReducer?.userInfo);
  }, [props.userReducer]);

  return (
    <>
      {userInfo && (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle
            nav
            caret
            className="pro-pic"
            style={{
              display: 'flex',
              alignItems: 'center',
              verticalAlign: 'middle',
            }}
          >
            {Object.keys(userInfo).length > 0 ? (
              <img
                src={companyPhoto}
                alt="company"
                className="rounded-circle"
                width="31"
              />
            ) : (
              <Skeleton
                variant="circle"
                width={35}
                height={35}
                className="rounded-circle"
              />
            )}
          </DropdownToggle>
          {Object.keys(userInfo).length > 0 ? (
            <DropdownMenu right className="user-dd">
              <div className="d-flex no-block align-items-center p-3 mb-2 border-bottom">
                <div className="">
                  <img
                    src={userInfo.avatar}
                    alt="user"
                    className="rounded-circle"
                    width="80"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="mb-0">{userInfo.displayName}</h4>
                  <p className="text-muted mb-0">{userInfo.email}</p>
                  <Button
                    href="/profile"
                    color="danger"
                    className="btn-rounded mt-2"
                  >
                    {props.t('components.headerProfiler.profile')}
                  </Button>
                </div>
              </div>
              {userInfo.admin ? (
                <>
                  <DropdownItem href="/company">
                    <i className="fas fa-building mr-1 ml-1" />
                    {'\u00A0'}
                    {props.t('components.headerProfiler.myCompany')}
                  </DropdownItem>
                  <DropdownItem href="/account">
                    <i className="fas fa-briefcase mr-1 ml-1" />
                    {'\u00A0'}
                    {props.t('components.headerProfiler.myAccount')}
                  </DropdownItem>
                </>
              ) : null}
              <DropdownItem href="/settings" className="border-bottom">
                <i className="fas fa-cog mr-1 ml-1" />
                {'\u00A0'}
                {props.t('components.headerProfiler.settings')}
              </DropdownItem>
              <DropdownItem
                onClick={handlerLogout}
                style={{ cursor: 'pointer' }}
              >
                <i className="fa fa-power-off mr-1 ml-1" />
                {'\u00A0'}
                {props.t('components.headerProfiler.logout')}
              </DropdownItem>
            </DropdownMenu>
          ) : null}
        </UncontrolledDropdown>
      )}
    </>
  );
};

export default V7HeaderProfiler;
