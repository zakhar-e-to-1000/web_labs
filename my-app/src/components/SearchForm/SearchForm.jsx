import Select from "@/components/Select/select"
import RangeInput from '@/components/RangeInput/RangeInput'
import styles from './SearchForm.module.css'
import { useState, useId } from "react";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton"
import PrimarySearchBar from "@/components/PrimarySearchBar/PrimarySearchBar"

function SearchForm({ optionsHook }) {
    const selectId = useId();
    const [searchPreffix, setSearchPreffix] = useState('')
    const [sortField, setSortFlield] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [durationRange, setDurationRange] = useState([NaN, NaN])
    const [reviewsRange, setReviewsRange] = useState([NaN, NaN])

    const sortOptions = [
        { value: "", text: 'None' },
        { value: "title", text: "Name" },
        { value: "duration", text: "Duration" },
        { value: "reviews", text: "Reviews" }
    ]
    const sortSubOprions = [
        { value: '', text: 'acs' },
        { value: 'des', text: 'des' }]
    const submit = (options) => {
        if (options.searchPreffix === undefined) {
            options = {
                searchPreffix: searchPreffix,
                sortField: sortField,
                sortOrder: sortOrder,
                durationRange: durationRange,
                reviewsRange: reviewsRange
            }
        }
        optionsHook(options)
    }
    const reset = () => {
        setSearchPreffix("")
        setDurationRange([NaN, NaN])
        setReviewsRange([NaN, NaN])
        setReviewsRange([NaN, NaN])
        setSortFlield('')
        setSortOrder([NaN, NaN])
        const options = {
            searchPreffix: '',
            sortField: '',
            sortOrder: '',
            durationRange: [NaN, NaN],
            reviewsRange: [NaN, NaN],
        }
        submit(options)
    }

    return <form className={styles.catalog__form}>
        <PrimarySearchBar value={searchPreffix} placeholder="search" valueHook={setSearchPreffix} onSubmit={submit} />
        <div>
            <label className={styles.select__label} htmlFor={selectId}>Sort by</label>
            <Select options={sortOptions} value={sortField} id={selectId} valueHook={setSortFlield} />
            <Select options={sortSubOprions} value={sortOrder} valueHook={setSortOrder} />
        </div>
        <p>Filters</p>
        <div>
            <p>Duration</p>
            <RangeInput unitName='min.' value={durationRange} rangeHook={setDurationRange} />
        </div>
        <div>
            <p>Reviews</p>
            <RangeInput unitName='count' value={reviewsRange} rangeHook={setReviewsRange} />
        </div>
        <div>
            <PrimaryButton onClick={submit}>Apply</PrimaryButton>
            <PrimaryButton onClick={reset}>Reset</PrimaryButton>
        </div>
        <p>{JSON.stringify(durationRange)}</p>
        <p>{JSON.stringify(reviewsRange)}</p>
    </form>
}

export default SearchForm;