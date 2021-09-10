import React, { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, Text, View,Button } from 'react-native'


export default function ViewCharacters() {

    const [data, setData] = useState([])
    let [count, setCount] = useState(1)

    const url = `https://anapioficeandfire.com/api/characters/?page=${count}`


    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
    }, [count]);


    return (
        <View style={{alignItems:'center',alignContent:'center', justifyContent:'center'}}>
            <SafeAreaView style={{alignItems:'center'}}>
                <Text style={{fontSize:30}}><b>A Song of Ice and Fire Characters</b></Text>
                <Text style={{margin:10, fontSize:20}}>George R.R Martin</Text>
            </SafeAreaView>
            <FlatList
                data={data}
                numColumns={3}
                renderItem={({ item }) =>
                <View style={{height: 90, width:200, borderWidth:1, borderColor:'black', margin: 5}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    {item.name== "" ? <Text><b>{item.aliases}</b></Text> : <Text><b>{item.name}</b></Text>}
                        {item.culture == "" ? null :
                        <Text style={{
                            borderWidth: 1,
                            marginTop:4,
                            marginRight:4,
                            height:17,
                            fontSize:10,
                            borderColor: 'dodgerblue',
                            backgroundColor:'lightblue',
                            }}>{item.culture}
                        </Text>
                        }
                    </View>
                    <View style={{marginTop:10,justifyContent:'center'}}>
                        {item.born== "" ? null: <Text style={{fontSize:10}}>{item.born}</Text>}
                        {item.died== "" ? null: <Text style={{fontSize:10}}>{item.died}</Text>}
                        <Text style={{fontSize:10,marginTop:2}}>{`Appeared in books:${item.books.map(x=>x.slice(-1))}`}</Text>    
                    </View>
                </View>
            }
        />
        <View style={{flexDirection:'row', marginTop: 30}}>
            {count == 1 ? <Button title ='first' disabled={true}/>:<Button title='first' onPress={()=>{setCount(1)}}/>}
            {count == 1 ? <Button title ='prev' disabled={true}/>:<Button title='prev' onPress={()=>{setCount(count-1)}}/>}
            {count == 214 ? <Button title ='next' disabled={true}/>:<Button title='next' onPress={()=>{setCount(count+1)}}/>}
            {count == 214 ? <Button title ='last' disabled={true}/>:<Button title='last' onPress={()=>{setCount(214)}}/>}
        </View>
    </View>

    )
}
