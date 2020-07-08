#
#
# main() will be run when you invoke this action
#
# @param Cloud Functions actions accept a single parameter, which must be a JSON object.
#
# @return The output of this action, which must be a JSON object.
#
#
import sys
import json

from watson_developer_cloud import DiscoveryV1

def main(param):
    #return({"ciao":"ciao"})
    credentials = {
        "Test_ricerca_e_sviluppo": {
            "APIKEY": "",
            "URL": "",
            "COLL_ID": "",
            "CONFIG_ID": "",
            "ENV_ID": ""
         }
    } # mancano le chiavi

    collection_names = ["Test_ricerca_e_sviluppo", "qualiware_test", "Stefal"]
    if (param["collection"] in collection_names): collection_params = credentials[param["collection"]]
    else: return ({"ERRORE": "il collection name non è corretto!"})

    discovery = DiscoveryV1(
        version="2020-05-22",
        url=collection_params['URL'],
        iam_apikey=collection_params["APIKEY"])

    query_result = discovery.query(
        environment_id = collection_params['ENV_ID'],
        collection_id =  collection_params['COLL_ID'],
        natural_language_query = param["query"],
        count = 100
    ).get_result()

    return query_result
