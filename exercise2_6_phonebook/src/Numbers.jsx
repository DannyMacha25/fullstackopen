import numberService from './services/numbers'

const Number = ({number_obj}) => {
    console.log(number_obj)
    const id = number_obj.id
    const del = () => {
        if (!window.confirm(`Do you reall want to delete ${number_obj.name}?`)) {
            return
        }

        numberService
         .deleteNumber(id)
         .then(data => console.log(data))
    }

    return (
        <div>
            <p>{number_obj.name} {number_obj.number}</p><button onClick={del}>delete</button>
        </div>
    )
}

const Numbers = ({names}) => {

    return (
        <div>
        {names.map(obj => 
            <div>
                <Number number_obj={obj} />
            </div>
        )}
        </div>
    )
}

export default Numbers