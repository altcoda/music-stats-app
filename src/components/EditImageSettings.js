import { Fragment } from 'react';
import { Form } from './Forms/Form';
import { editUser } from '../utils/users';
import { FaUserEdit } from 'react-icons/fa';
import { IconStyleSwitch } from '../components/UI/IconStyleSwitch';


export const EditImageSettings = ({user, id, setUser, icon, setIcon, cover, setCover}) => {

    const toggleEditIconButton = () => {
        document.getElementById('icon-edit-overlay').classList.toggle('hidden');
    }

    const toggleEditIcon = () => {
        document.getElementById('edit-icon').classList.toggle('hidden');
    }

    const onEditIcon = (e) => {
        e.preventDefault()
        toggleEditIcon()
    }

    const onIconChange = (e) => {
        setIcon(e.target.value)
    }

    const onCoverChange = (e) => {
        setCover(e.target.value)
    }

    const onSaveImageSettings = (e) => {
        e.preventDefault()

        if(user && id) {
            if(cover !== '') {
                editUser(id, {cover})
            }
    
            if(icon !== '') {
                editUser(id, {icon})
            }
        }
        
        toggleEditIcon()
    }

    return (
        <Fragment>
            {user.icon && <FaUserEdit onClick={onEditIcon} id="icon-edit-overlay" className="icon-edit-overlay flex-column hidden" />}
            
            <div id="edit-icon" className="edit-icon flex-column hidden">
                <Form id="edit-images-form" onSubmit={onSaveImageSettings}>
                    <label htmlFor="cover-url">cover url</label>
                    <input id="cover-url" placeholder="cover url" onChange={onCoverChange} />
                    <label htmlFor="icon-url">icon url</label>
                    <input id="icon-url" placeholder="image url" onChange={onIconChange} />
                    <IconStyleSwitch user={user} userId={id} setUser={setUser} />
                    <button type="submit" className="green">Save</button>
                    <small>(empty fields won't cause changes on save)</small>
                </Form>
            </div>
            {user.icon && <img onMouseEnter={toggleEditIconButton} onMouseLeave={toggleEditIconButton} onClick={onEditIcon} src={user.icon} alt="" className={`icon ${user.iconBorderStyle}`} />}
        </Fragment>
    )
}