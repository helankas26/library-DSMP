import React, {Dispatch, Fragment, SetStateAction, useState} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'

const ComboboxSingleSelect: React.FC<{
    id: string;
    objects: any[];
    displayField: string;
    selectedObjects: any;
    setSelectedObjects: Dispatch<SetStateAction<any>>
}> = (props) => {
    const {id, objects, displayField, selectedObjects, setSelectedObjects} = props;
    const [query, setQuery] = useState<string>('');

    const compareSelected = (a: any, b: any) => {
        return a._id === b._id;
    }

    const filteredObject =
        query === ''
            ? objects
            : objects.filter((object) => {
                return object[displayField].toString().toLowerCase().includes(query.toLowerCase())
            });

    return (
        <Combobox value={selectedObjects} by={compareSelected} onChange={setSelectedObjects} nullable>
            <div className="relative mt-1 rounded">
                <div
                    className="relative w-full cursor-default overflow-hidden rounded bg-white text-left focus:outline-none sm:text-sm">
                    <Combobox.Input
                        className="appearance-none border rounded w-full py-2.5 px-3 text-sm text-gray-700 leading-5 focus:outline-none focus:shadow-outline"
                        id={id}
                        displayValue={(object) => (object as any)?.[displayField]}
                        onChange={(event) => setQuery(event.target.value)}
                        required={true}
                        autoComplete="off"
                        placeholder={`Select ${id}`}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400"/>
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}>
                    <Combobox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white text-base shadow focus:outline-none sm:text-sm">
                        {filteredObject.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredObject.map((object) => (
                                <Combobox.Option
                                    key={object._id}
                                    className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`}
                                    value={object}>
                                    {({selected, active}) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {object[displayField]}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}>
                                                    <CheckIcon className="h-5 w-5"/>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}

export default ComboboxSingleSelect;