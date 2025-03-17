import classes from './FormInput.module.css'
export function FormInput({id, inputType, placeholder, labelText}) {
    return (
        <div className={classes.formItem}>
            <label className={classes.formItemLabel} htmlFor={id}>{labelText}</label>
            <input id={id} type={inputType} name={id} placeholder={placeholder}/>
        </div>
    )
}
