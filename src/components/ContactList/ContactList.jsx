import s from './ContactList.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/actions';
import { filteredContactsSelector } from 'redux/selectors';

export default function ContactList() {
  // const { contacts, deleteItem } = props;
  // const [contacts, setContacts] = useState(get(contactKey) ?? []);
  const contacts = useSelector(state => filteredContactsSelector(state));
  const dispatch = useDispatch();

  const deleteItem = e => {
    const id = e.target.id;
    dispatch(removeContact(id));
    // const newList = contacts.filter(el => el.id !== id);
    // setContacts(newList);
  };

  return (
    <ul className={s.list}>
      {contacts.map(contact => (
        <li className={s.item} key={contact.id}>
          {Object.keys(contact).map(el =>
            el === 'id' ? null : (
              <p className={s.element} key={contact[el]}>
                {contact[el]}
              </p>
            )
          )}
          <button
            onClick={deleteItem}
            id={contact.id}
            className={s.button}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  deleteItem: PropTypes.func,
};
