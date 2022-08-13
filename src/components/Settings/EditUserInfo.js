import { Fragment } from 'react';
import { editUser } from '../../utils/users';
import { Form } from '../Forms/Form';
import { FaUserEdit, FaRegWindowClose } from 'react-icons/fa';
import { parseInputDate } from '../../utils/global';
import { ThemeSwitch } from './ThemeSwitch';


export const EditUserInfo = ({user, id, description, setDescription, birthdate, setBirthdate}) => {

    const toggleEditUserInfo = () => document.getElementById('edit-user-info').classList.toggle('hidden');

    const onUserInfoEditClose = () => {
        toggleEditUserInfo()
    }
    
    const onEditUserInfo = () => {
        toggleEditUserInfo()
    }
    
    const onSaveUserInfo = (e) => {
        e.preventDefault()

        if(description !== '') {
            editUser(id, {description})
        }
        if(birthdate !== '') {
            editUser(id, {birthdate: parseInputDate(birthdate)})
        }

        toggleEditUserInfo()
    }


    return (
        <Fragment>
            <FaUserEdit onClick={onEditUserInfo} id="edit-user-info-button" className="edit-user-info-button" />
            <Form onSubmit={onSaveUserInfo} id="edit-user-info" className="edit-user-info hidden">
                <h3 onClick={onUserInfoEditClose}>CANCEL EDITING <FaRegWindowClose className="close-icon" /></h3>

                <h2>Edit Profile</h2>
                    <label htmlFor="edit-user-birthdate">Age:</label>
                    <input
                        id="edit-user-birthdate"
                        type="date"
                        name="edit-user-birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                    <label htmlFor="edit-user-description">Description:</label>
                    <textarea
                        id="edit-user-description"
                        type="text"
                        name="edit-user-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {/* <ThemeSwitch /> */}
                <button type="submit" className="green">Save</button>
            </Form>
        </Fragment>
    )
}