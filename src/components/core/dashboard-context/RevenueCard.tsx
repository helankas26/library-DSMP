import React from "react";
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';

const RevenueCard: React.FC<{ title: string; amount: number; type: string }> = (props) => {

    let icon: React.JSX.Element = <></>;
    let iconColor: string = '';

    switch (props.title) {
        case 'Admission':
            icon = <GroupsRoundedIcon fontSize="medium"/>;
            iconColor = 'bg-red-500';
            break;
        case 'Fine':
            icon = <PaymentsRoundedIcon fontSize="medium"/>;
            iconColor = 'bg-orange-500';
            break;
        case 'Subscription':
            icon = <AttachMoneyRoundedIcon fontSize="large"/>;
            iconColor = 'bg-pink-500';
            break;
        case 'Total':
            icon = <PercentRoundedIcon fontSize="medium"/>;
            iconColor = 'bg-sky-500';
            break;
    }


    return (
        <div className="w-full lg:w-6/12 xl:w-3/12">
            <div
                className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg border border-gray-200">
                <div className="flex-auto p-4">
                    <div className="flex">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-gray-400 uppercase font-bold text-xs">{props.title}</h5>
                            <p className="font-bold text-xl text-gray-700">{props.amount}</p>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${iconColor}`}>
                                {icon}
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 whitespace-nowrap">{props.type}</p>
                </div>
            </div>
        </div>
    );
}

export default RevenueCard;