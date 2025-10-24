import Select from "@/components/Select/select"
import RangeInput from '@/components/RangeInput/RangeInput'
import styles from './SearchForm.module.css'
import { useState, useId } from "react";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton"
import PrimarySearchBar from "@/components/PrimarySearchBar/PrimarySearchBar"

function SearchForm({ optionsHook }) {
    const selectId = useId();
    const [searchPreffix, setSearchPreffix] = useState('')
    const sortOptions = [
        { value: "", text: 'None' },
        { value: "title", text: "Name" },
        { value: "duration", text: "Duration" },
        { value: "reviews", text: "Reviews" }
    ]
    const [sortField, setSortFlield] = useState('')
    function submit() {
        optionsHook({
            searchPreffix: searchPreffix,
            sortField: sortField
        })
    }

    return <form className={styles.catalog__form}>
        <PrimarySearchBar placeholder="search" onChange={setSearchPreffix} onSubmit={submit} />
        <div>
            <label className={styles.select__label} htmlFor={selectId}>Sort by</label>
            <Select options={sortOptions} id={selectId} valueHook={setSortFlield} />
        </div>
        <p>Filters</p>
        <div>
            <p>Duration</p>
            <RangeInput unitName='min.' />
        </div>
        <div>
            <p>Reviews</p>
            <RangeInput unitName='count' />
        </div>
        <div>
            <PrimaryButton onClick={submit}>Apply</PrimaryButton>
            <PrimaryButton>Reset</PrimaryButton>
        </div>
        <p>{searchPreffix}</p>
    </form>
}

export default SearchForm;