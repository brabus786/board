import { v4 as uuidv4 } from 'uuid';

const initialState = {
    lists: [
        {
            id: uuidv4(),
            title: 'В работе ',
            cards: [],
            isAddingCard: false,
            // textareaRef: createRef(),
            isInvalid:false,
        },
        {
            id: uuidv4(),
            title: 'На проверке',
            cards: [],
            isAddingCard: false,
            // textareaRef: createRef(),
            isInvalid:false,
        },
        {
            id: uuidv4(),
            title: 'Выполнено',
            cards: [],
            isAddingCard: false,
            // textareaRef: createRef(),
            isInvalid:false,
        },
    ]
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CARD_START': {
            const listIndex = state.lists.findIndex((listData) => listData.id === action.listId);          
            
            for(let i = 0; i < state.lists.length; i++){
                state.lists[i].isInvalid = false;
                if(listIndex !== i){
                    state.lists[i].isAddingCard = false;
                }        
            }
            
            const listsCopy = [...state.lists];

            const listCopy = { ...listsCopy[listIndex] };
            listCopy.isAddingCard = true;
            listsCopy[listIndex] = listCopy;

            return { lists: listsCopy };
        }

        case 'ADD_CARD_CANCEL': {
            const listIndex = state.lists.findIndex((listData) => listData.id === action.listId);
            const listsCopy = [...state.lists];
            const listCopy = { ...listsCopy[listIndex] };
            listCopy.isAddingCard = false;
            listCopy.isInvalid = false;
            listsCopy[listIndex] = listCopy;

            return { lists: listsCopy };
        }

        case 'ADD_CARD_FINISH': {

               // console.log(action.cardText);

                const listIndex = state.lists.findIndex((listData) => {return  listData.id === action.listId});
                const listsCopy = [...state.lists];
                const listCopy = listsCopy[listIndex];

                if(action.cardText === ''){
                    listCopy.isInvalid = true;
                }else{
                    listCopy.cards.push({
                        id: uuidv4(),
                        title: action.cardText,
                        description: '',
                    });
                    listCopy.isInvalid = false;
                    listCopy.isAddingCard = false;
                }

               return {lists: listsCopy}          
        }

        case 'EDIT_TITLE_FINISH': {    
            let allCards = [];
            for(let i = 0; i < state.lists.length; i++){
                allCards = allCards.concat(state.lists[i].cards)
            }

            for(let i = 0; i < allCards.length; i++){                
                    if(allCards[i].id === action.id){
                        allCards[i].title = action.inputTitle;
                    }           
            }
  
            return state;
        }

        case 'EDIT_DESCRIPTION_FINISH': {
            console.log('EDIT_DESCRIPTION_FINISH ' + action.id);

            let allCards = []
            for(let i = 0; i < state.lists.length; i++){
                allCards = allCards.concat(state.lists[i].cards)
            }

            for(let i = 0; i < allCards.length; i++){                
                    if(allCards[i].id === action.id){
                        allCards[i].description = action.description;
                    }           
            }
            return state;
        }
        
        default:
            return state;


    }

    // return state;
}

export default reducer;