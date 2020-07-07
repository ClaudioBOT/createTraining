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
from datetime import datetime
from botocore.client import Config
import ibm_boto3
import pytz
import json

def write_COS(file_name, path,cos_credentials,cos):
    try:
        print("sono qui")
        res = cos.upload_file(Filename=f"{file_name}",Bucket=cos_credentials['BUCKET'],Key=f"{path}/{file_name}")
        return(1)
    except Exception as e:
        print(Exception, e)
        return(0)

def write_file_json(obj,cos_credentials,cos):
    #scrittura di un file.json sul COS
    filename="JSONtraining"
    date = datetime.now(pytz.timezone('Europe/Rome')).strftime("%Y-%m-%d_%H-%M")
    filename = filename + "_" + date + ".json"
    with open(filename, 'w') as outfile:
        json.dump(obj, outfile, indent=4)
    esito= write_COS(filename, "folder_jsontraining", cos_credentials,cos)
    if esito==1:
        return filename
    else:
        return  "ERRORE"

def connect(cos_credentials):
    #stabilisce la connessione/autenticazione con il Cloud Object Storage
    cos = ibm_boto3.client(service_name='s3',
    ibm_api_key_id=cos_credentials['IBM_API_KEY_ID'],
    ibm_service_instance_id=cos_credentials['IAM_SERVICE_ID'],
    ibm_auth_endpoint=cos_credentials['IBM_AUTH_ENDPOINT'],
    config=Config(signature_version='oauth'),
    endpoint_url=cos_credentials['ENDPOINT'])
    return cos


def main(param):
    cos_credentials = {
        'IAM_SERVICE_ID': '',
        'IBM_API_KEY_ID': '',
        'ENDPOINT': '',
        'IBM_AUTH_ENDPOINT': '',
        'BUCKET': ''
    } # mancano le chiavi


    cos= connect(cos_credentials)
    message = write_file_json(param['file'],cos_credentials,cos)#json.dumps(params["file"],indent=4)
    return {'filename': message}
