import React, {Fragment, useState} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'


const ComboboxMultipleSelect: React.FC<{ objects: any[]; displayField: string; }> = (props) => {
    const [selectedObjects, setSelectedObjects] = useState([]);
    const [query, setQuery] = useState('');

    const filteredObject =
        query === ''
            ? props.objects
            : props.objects.filter((object) => {
                return object[props.displayField].toString().toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selectedObjects} onChange={(event) => setSelectedObjects(event)} multiple>
            <div className="relative mt-1 rounded">
                <div
                    className="relative w-full cursor-default overflow-hidden rounded bg-white text-left focus:outline-none sm:text-sm">
                    <Combobox.Input
                        className="appearance-none border border-gray-300 rounded w-full py-2.5 px-3 text-sm text-gray-700 leading-5 focus:outline-none focus:shadow-outline"
                        displayValue={(objects) =>
                            (objects as any).map((object: {
                                [x: string]: any;
                            }) => object[props.displayField]).join(', ')
                        }
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"/>
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
                                    key={object.id}
                                    className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`}
                                    value={object}>
                                    {({selected, active}) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {object[props.displayField]}
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

export default ComboboxMultipleSelect;