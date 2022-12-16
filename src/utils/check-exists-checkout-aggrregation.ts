function CheckExistsCheckOutAggregation(checkOutName: string = "checkOut"){
    return {
        $sum: {
            $cond: [
                {
                    $eq: [
                        {
                            $type: `$${checkOutName}.date`
                        },
                        "date"
                    ],	
                },
                1,
                0
            ]
        }
    }
}

export {
    CheckExistsCheckOutAggregation
}