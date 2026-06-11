interface SearchErrorProps {
  search: string; 
}
export const Error=()=> {
return(
    <p>⚠️ Щось пішло не так. Будь ласка, спробуйте пізніше.</p>
)    
 }
export const SearchError=({ search }: SearchErrorProps) => {
    return (
        <div >
         <p>За запитом <strong>"{search}"</strong> нічого не знайдено 🔍</p>
          </div>
    )
 }

